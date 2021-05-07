"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const passport = require("passport");
//=================================
//             User
//=================================
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
    });
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User(req.body);
    try {
        yield user.save();
        return res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
    }
}));
//login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("no user");
            return res.json({ msg: info });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ loginSuccess: true });
        });
    })(req, res, next);
});
router.get("/logout", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout();
    res.status(200).send({
        success: true,
    });
}));
module.exports = router;
