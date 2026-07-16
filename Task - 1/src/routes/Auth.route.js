import { Router } from "express";
import {Registeruser , GetMeAccess,RefreshToken,LogoutUser,login,VerifyEmail} from "../controller/auth.controller.js";
const AuthRouter = Router()


AuthRouter.post('/register', Registeruser)

AuthRouter.post('/login', login)

AuthRouter.get('/get-me', GetMeAccess)

AuthRouter.post('/refresh-toekn', RefreshToken)

AuthRouter.get('/logout',LogoutUser )

AuthRouter.post('/verify-email',VerifyEmail )


export default AuthRouter