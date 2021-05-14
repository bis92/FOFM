"use strict";
const passport = require("passport");
const express = require("express");
const app = express();
module.exports = app => {
    app.get("/auth/google", passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ]
    }));
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("https://www.fofm.co.kr/main");
    });
};
