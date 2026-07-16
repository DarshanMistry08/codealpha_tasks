import User from '../models/Auth/User.model.js'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import Session from '../models/Auth/session.model.js'
import { sendEmail } from '../services/email.services.js';
import OtpsModel from '../models/Auth/otp.model.js';
import { generateOtps, getOtpHtml } from '../../utils/otp.util.js'
import cookieParser from "cookie-parser";




export async function Registeruser(req, res) {
    // get user from the url or body
    const { username, email, password, phoneNumber } = req.body;

    if ([username, email, password, phoneNumber].some((field) => !field)) {
        throw new ApiError(400, "All field are required")
    }

    // check wether a user have already account check with multiple fields
    const isAlreadyRegister = await User.findOne({
        $or: [
            { username }, { email }
        ]
    })

    // check if user have already account then  
    if (isAlreadyRegister) {
        throw new ApiError(400, "User Already Existing ")
    }

    // if the user dont have the account then we have to create it for that 
    // then we have to create a hashed password 
    //with that we have to create a token with _id and name payload


    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await User.create({
        username, email, phoneNumber, password: hashedPassword
    })

    const otp = generateOtps()
    const html = getOtpHtml(otp)

    const OtpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await OtpsModel.create({ email, user: user._id, OtpHash })

    // console.log(email)

    // console.log("EMAIL BEFORE SEND =", email);

    // await sendEmail(
    //     email,
    //     "OTP Verification",
    //     `Your OTP code is ${otp}`,
    //     html
    // );



    // const RefreshToken = jwt.sign(
    //     {
    //         id: user._id,
    //     }, config.JWT_SECRET,
    //     {
    //         expiresIn: "10d"
    //     }
    // )

    // const RefreshTokenHash = crypto.createHash("sha256").update(RefreshToken).digest("hex");

    // const session = await Session.create({
    //     user: user._id,
    //     RefreshTokenHash,
    //     ip: req.ip,
    //     userAgent: req.headers["user-agent"]
    // })
    // // after user create we create token and send with user and get with in response 
    // const AccessToken = jwt.sign(
    //     {
    //         id: user._id,
    //         sessionId: session._id
    //     }, config.JWT_SECRET,
    //     {
    //         expiresIn: "30m"
    //     }
    // )

    // res.cookie("RefreshToken", RefreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     samesite: "strict",
    //     maxAge: 7 * 24 * 60 * 60 * 1000 //7day 
    // })

    // console.log(user._id)


    return res.status(201).json(
        new ApiResponse(201, { user, email, password }, "User registered successfully")
    );
}

export async function login(req, res) {
    const { email, password } = req.body
    const users = await User.findOne({ email })
    // console.log(users.password)
    // console.log(users.email)
    // console.log(users)
    if (!users) {
        throw new ApiError(400, "User not found")
    }

    if (!users.verified) {
        throw new ApiError(401, "Email is not verified yet ")
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValide = hashedPassword === users.password

    // console.log(isPasswordValide)
    // console.log(hashedPassword)
    // console.log(users.password)

    if (!isPasswordValide) {
        throw new ApiError(400, "Invalid email or password 1")
    }


    const Refreshtoken = jwt.sign({
        id: users._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    const RefreshTokenHash = crypto.createHash("sha256").update(Refreshtoken).digest("hex")


    const session = await Session.create({
        user: users._id,
        RefreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const AccessToken = jwt.sign({
        id: users._id,
    }, config.JWT_SECRET, {
        expiresIn: "120m"
    })

    res.cookie("AccessToken", AccessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000  //1day
    })

    res.cookie("Refreshtoken", Refreshtoken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000  //7day
    })
    res.status(200).json({
        message: "login successfully",
    })
}




// after that if we want to get the access then we send cookie in the header and with that we can access the user
export async function GetMeAccess(req, res) {

    const AccessToken = req.cookies?.AccessToken;

    if (!AccessToken) {
        throw new ApiError(401, "Token not found");
    }
    // console.log(req.cookies);
    // console.log(req.cookies.AccessToken);

    // after sending cookie in that header we have to verify that the get cookie is valid or perticular from that user or not so we decode that token and check that token 
    const decode = jwt.verify(AccessToken, config.JWT_SECRET)

    const user = User.findById(decode.id)
    if (!user) {
        throw new ApiError(302, "User Not Found")
    }
    res.status(201).json(
        new ApiResponse(201, "User Fetch Successfully")
    )
}


export async function RefreshToken(req, res) {
    const RefreshToken = req.cookies?.Refreshtoken;
    // console.log(req.cookies);
    // console.log(RefreshToken)
    if (!RefreshToken) {
        throw new ApiError(401, "RefreshToken not found");
    }

    const decode = jwt.verify(RefreshToken, config.JWT_SECRET)

    const RefreshTokenHash = crypto.createHash("sha256").update(RefreshToken).digest("hex");
    // console.log(RefreshToken)
    const session = await Session.findOne({
        RefreshTokenHash,
        revoke: false,
    })

    if (!session) {
        throw new ApiError(400, "invalid refreshtoken ")
    }



    const AccessToken = jwt.sign(
        {
            id: decode.id
        }, config.JWT_SECRET, {
        expiresIn: "30m"
    }
    )

    const newRefreshToken = jwt.sign({
        id: decode.id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    }
    )
    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")
    session.RefreshTokenHash = newRefreshTokenHash
    await session.save()

    res.cookie("Refreshtoken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000  //7day
    })

    res.cookie("AccessToken", AccessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000  //1day
    })
    res.status(201).json(
        new ApiResponse(201, { AccessToken }, "access token created successfuly")
    )
}
// i think here i also update access token with refreshtoken and i do and it worksss,......


export async function LogoutUser(req, res) {
    const RefreshToken = req.cookies.Refreshtoken;
    // console.log(RefreshToken)
    if (!RefreshToken) {
        throw new ApiError(400, "RefreshToken not found")
    }

    const RefreshTokenHash = crypto.createHash("sha256").update(RefreshToken).digest("hex");
    console.log(RefreshTokenHash)
    const session = await Session.findOne({
        RefreshTokenHash,
    })

    if (!session) {
        throw new ApiError(400, "invalid refreshtoken ")
    }
    session.revoke = true,
        await session.save()
    console.log(session.revoke);
    res.status(200).json({
        message: "logout successfully"

    })
}
 // without session you can do this
        //  const options = {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        // };
        // return res
        //     .status(200)
        //     .clearCookie("AccessToken", options)
        //     .clearCookie("RefreshToken", options)
        //     .json(
        //         new ApiResponse(200, "User logged out successfully")
        //     );

        

export async function VerifyEmail(req, res) {
    const { otp, email } = req.body
    // console.log(otp,email)

    const OtpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await OtpsModel.findOne({ email, OtpHash })

    if (!otpDoc) {
        throw new ApiError(401, "invalid OTP")
    }

    const user = await User.findByIdAndUpdate(
        otpDoc.user,
        {
            verified: true,
        },
        {
            new: true,
        }
    );

    await OtpsModel.deleteMany({ user: otpDoc.user })

    res.status(200).json({
        message: "email is verified successfully"
    })

}

