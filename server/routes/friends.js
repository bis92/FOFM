const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { Friend } = require("../models/Friend");
aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "fofm",
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
}).single("file");

//=================================
//             Product
//=================================

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send({ success: false, err });
    res.json({
      success: true,
      filePath: res.req.file.location,
      fileName: res.req.file.key,
    });
  });
});

router.post("/", (req, res) => {
  const friend = new Friend(req.body);
  friend.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/getFriends", (req, res) => {
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let term = req.body.searchTerm;
  let addr = req.body.searchAddress;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "age") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  if (term) {
    if (addr) {
      Friend.find(findArgs)
        .find({ $text: { $search: term } })
        .find({ address: { $regex: addr } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("writer")
        .exec((err, friendInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res
            .status(200)
            .json({ success: true, friendInfo, postSize: friendInfo.length });
        });
    } else {
      Friend.find(findArgs)
        .find({ $text: { $search: term } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("writer")
        .exec((err, friendInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res
            .status(200)
            .json({ success: true, friendInfo, postSize: friendInfo.length });
        });
    }
  } else {
    if (addr) {
      Friend.find(findArgs)
        .find({ address: { $regex: addr } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("writer")
        .exec((err, friendInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res
            .status(200)
            .json({ success: true, friendInfo, postSize: friendInfo.length });
        });
    } else {
      Friend.find(findArgs)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("writer")
        .exec((err, friendInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res
            .status(200)
            .json({ success: true, friendInfo, postSize: friendInfo.length });
        });
    }
  }
});

router.get("/friends_by_id", (req, res) => {
  let friendIds = req.query.id;

    Friend.find({ _id: friendIds }).exec((err, friend) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(friend);
  });
});

router.put("/updateFriend", (req, res) => {
  let variables = {
    writer: req.body.writer,
    _id: req.body._id,
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    address: req.body.address,
    interest: req.body.interest,
    mbtis: req.body.mbtis,
    contact: req.body.contact,
    introduce: req.body.introduce,
    images: req.body.images,
  };

  Friend.findOneAndUpdate({ _id: req.body._id }, { $set: variables })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
});

router.delete("/deleteFriend", (req, res) => {
  Friend.findOneAndDelete({ _id: req.query.id }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/getMypost", (req, res) => {
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;

  Friend.find({ writer: req.body.writer })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("writer")
    .exec((err, friendInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, friendInfo, postSize: friendInfo.length });
    });
});

module.exports = router;
