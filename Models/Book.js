const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  yearOfPublication: {
    type: Number,
    required: true,
  },
  isIssued: {
    type: Boolean,
    default: false,
  },
  noOfCopies: {
    type: Number,
    required: true,
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  issueCount:{
    type:Number,
    default:0
  }
});
module.exports= mongoose.model("Book", BookSchema);
