const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required to create an author"],
      validate: {
        validator: (value) =>
          validator.isEmail(value, {
            host_blacklist: ["gmail.com"],
          }),
        message: ({ value }) => {
          if (value.includes("gmail.com"))
            return `Personal emails are now allowed. Please use a business email!`;
          return `${value} is not a valid email address!`;
        },
      },
    },
    twitterHandle: { type: String, default: "" },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
      validate: {
        validator: (value) => validator.isURL(value, { protocols: ["https"] }),
        message: ({ value }) => `${value} is not a valid URL!`,
      },
    },
  },
  {
    _id: false,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: [authorSchema], default: [] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    //_id: false, //
  }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
