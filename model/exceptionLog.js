const mongoose = require("mongoose");

const exceptionSchema = new mongoose.Schema(
  {
    message: String,
    time: Date,
    stack: String,
    url: String,
    statusCode: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("exceptionlogs", exceptionSchema);
