"use strict";
require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const csp = require("helmet-csp");
const config = require("./config/key");
const passport = require("passport");
//Out of the box, express has no idea how to handle cookies,
//so we need to install a helper library called Cookie Session.
const cookieSession = require("cookie-session");
/**
 * Passport configuration.
 */
const connectString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@boilerplate.2wgwr.mongodb.net/friendoptimizedforme?retryWrites=true&w=majority`;
mongoose
    .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error(err));
const app = express();
// tell app to use cookie
app.use(cookieSession({
    maxAge: 1209600000,
    keys: [config.cookieEncryptionKey], //
}));
// tell pasport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
app.use(csp({
    directives: {
        defaultSrc: [
            "'self'",
            "https://fofm.s3.amazonaws.com",
            "https://fofm.s3.ap-northeast-2.amazonaws.com",
        ],
        styleSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: [
            "'self'",
            "https://fofm.s3.amazonaws.com",
            "https://fofm.s3.ap-northeast-2.amazonaws.com",
        ],
    },
    reportOnly: false,
}));
// Logger Middleware
app.use(morgan("dev"));
// CORS Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
app.use("/api/users", require("./routes/users"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/auth", require("./routes/auth"));
//use this to show static files you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
    // index.html for all page routes  html or routing and naviagtion
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});
