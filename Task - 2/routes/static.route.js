
const express = require("express");
const router = express.Router();
const URL = require("../models/url.model");

// Protected Home Page 
router.get("/", async (req, res) => {
    const allurls = await URL.find({});

    return res.render("home", {
        urls: allurls,
         user: req.user, //for logout
    });
});

module.exports = router;