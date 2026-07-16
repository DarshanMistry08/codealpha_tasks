const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");
const { removeUser } = require("../service/auth");

// SIGNUP
async function handleUSerSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}


// LOGIN
async function handleUSerLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // console.log("User:", user);

    if (!user || user.password !== password) {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }

    const sessionID = uuidv4();
    setUser(sessionID, user);

    res.cookie('uid', sessionID);

    return res.redirect("/url");
}

// LOGOUT
function handleUserLogout(req, res) {
    const uid = req.cookies?.uid;

    if (uid) {
        removeUser(uid);
    }

    res.clearCookie("uid");

    return res.redirect("/user/login");
}

module.exports = {
    handleUSerSignup, handleUSerLogin, handleUserLogout
}
