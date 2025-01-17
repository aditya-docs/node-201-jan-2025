const BlogService = require("../services/blogs.service");
const BlogServiceInstance = new BlogService();

const createBlog = async (req, res) => {
  try {
    const newBlog = BlogServiceInstance.create(req.body);
    await BlogServiceInstance.save(newBlog);
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
    res.send(await BlogServiceInstance.getAll());
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
    await BlogServiceInstance.deleteById(blogId);
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
    const updatedBlog = await BlogServiceInstance.updateById(blogId, req.body);
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
  const result = await BlogServiceInstance.searchByTitleOrAuthor(title, author);
  if (result) return res.send(result);
  res
    .status(400)
    .send({ message: `At least one of 'title' or 'author' is required` });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  searchBlogs,
};
