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
  noOfCopies: {
    type: Number,
    required: true,
  },
  issueCount:{
    type:Number,
    default:0
  }
});
module.exports= mongoose.model("Book", BookSchema);
