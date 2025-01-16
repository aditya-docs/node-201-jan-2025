const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: [String], default: [] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
