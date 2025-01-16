const Blog = require("../models/blog.model");

const findBlogByIdAndAttach = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const reqBlog = await Blog.findById(blogId);
    if (!reqBlog)
      return res
        .status(404)
        .send({ message: `A blog with this Id could not be found.` });
    req.blog = reqBlog;
    next();
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).send({ message: "Invalid Blog Id." });
    res
      .status(500)
      .send({ message: "Something went wrong, please try again!", error });
  }
};

module.exports = findBlogByIdAndAttach;
