"use strict";
const express = require("express");
const passport = require('passport');
const router = express.Router();
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("http://localhost:3000/");
});
module.exports = router;
