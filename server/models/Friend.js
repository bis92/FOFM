const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      maxlength: 50,
    },
    gender: {
      type: Number,
    },
    age: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      maxlength: 50,
    },
    interest: {
      type: String,
      maxlength: 50,
    },
    mbtis: {
      type: Number,
      default: 0,
    },
    contact: {
      type: String,
    },
    introduce: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

friendSchema.index(
  {
    interest: "text",
    introduce: "text",
  },
  {
    weights: {
      interest: 5,
      introduce: 1,
    },
  }
);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = { Friend };
