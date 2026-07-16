
const express = require("express");
const { handleUSerSignup, handleUSerLogin, handleUserLogout} = require("../controllers/user.controller");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

// for signup
router.post("/", handleUSerSignup);


router.post("/login", handleUSerLogin);

router.get("/logout", handleUserLogout);

module.exports = router;