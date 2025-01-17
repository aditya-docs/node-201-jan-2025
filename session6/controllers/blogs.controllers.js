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

// const searchBlogs = async (req, res) => {
//   const { title, author } = req.query;
//   // const titleRegex = new RegExp(title, "i");
//   // res.send(await Blog.find({ title: titleRegex }));

//   // OR

//   // const titleRegex = new RegExp(title, "i"); // regex/pattern contains the flags/options
//   // const titleQuery = { title: { $regex: titleRegex } };

//   // OR

//   // const titleRegex = new RegExp(title); // regex/pattern doesn't contain the flags/options
//   // const titleQuery = { title: { $regex: titleRegex, $options: "i" } };

//   // res.send(await Blog.find(titleQuery));
//   // const authorEmailQuery = {
//   //   author: {
//   //     $elemMatch: { email: author },
//   //   },
//   // };
//   // const authorRegex = new RegExp(author, "i");
//   // const authorNameQuery = {
//   //   author: {
//   //     $elemMatch: { fullName: authorRegex },
//   //   },
//   // };
// };

const searchBlogs = async (req, res) => {
  const { title, author } = req.query;

  const titleRegex = new RegExp(title); // regex/pattern doesn't contain the flags/options
  const titleQuery = {
    title: { $regex: titleRegex, $options: "i" },
  };
  const authorQuery = {
    author: {
      $elemMatch: { email: author },
    },
  };

  if (title && author)
    return res.send(await Blog.find({ $and: [titleQuery, authorQuery] }));
  else if (title) return res.send(await Blog.find(titleQuery));
  else if (author) return res.send(await Blog.find(authorQuery));
  else
    res.status(400).send({
      message: `At least one of 'title' or 'author' is needed to search blogs!`,
    });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  searchBlogs,
};
