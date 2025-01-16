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

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find());
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again!", error });
  }
};

const getBlogById = async (req, res) => res.send(req.blog);

const deleteBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    await Blog.findByIdAndDelete(blogId);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again!", error });
  }
};

const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      // returnDocument: "after",
      new: true,
    });
    res.send(updatedBlog);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again!", error });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
