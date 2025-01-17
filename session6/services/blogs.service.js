const Blog = require("../models/blog.model");

class BlogService {
  create = (payload) => new Blog(payload);

  save = (blog) => blog.save();

  getAll = () => Blog.find();

  getById = (blogId) => Blog.findById(blogId);

  deleteById = (blogId) => Blog.findByIdAndDelete(blogId);

  updateById = (blogId, payload) =>
    Blog.findByIdAndUpdate(blogId, payload, {
      new: true,
    });

  searchByTitleOrAuthor = (title, author) => {
    const titleRegex = new RegExp(title); // regex/pattern doesn't contain the flags/options
    const titleQuery = {
      title: { $regex: titleRegex, $options: "i" },
    };
    const authorQuery = {
      author: {
        $elemMatch: { email: author },
      },
    };

    if (title && author) return Blog.find({ $and: [titleQuery, authorQuery] });
    else if (title) return Blog.find(titleQuery);
    else if (author) return Blog.find(authorQuery);
    else return new Promise((resolve, reject) => resolve(null));
  };
}

module.exports = BlogService;
