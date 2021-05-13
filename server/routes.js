const express = require("express");
const app = express();
const router = express.Router();

const authRouter = require('./routes/auth');
const friendsRouter = require('./routes/friends');
const usersRouter = require('./routes/users');

router.get("/", function(req, res, next) {
  res.status(200).json({
    isSuccess: true,
    message: "Server is up and running!"
  });
});

app.use('/auth', authRouter); 
app.use('/friends', friendsRouter); 
app.use('/users', usersRouter); 

router.get("*", (req, res) => {
  res.status(200).json({
    isSuccess: false,
    message: "Invalid address!"
  });
});

module.exports = router;