const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    // const newBlog = await Blog.create(req.body);
    // OR
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).send(newBlog);
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).send({ message: error.message });
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: `A blog with this title already exists!` });
    res
      .status(500)
      .send({ message: "Something went wrong. Please try again", error });
  }
};

module.exports = { createBlog };
