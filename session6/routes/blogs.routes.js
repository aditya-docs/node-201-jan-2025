const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogs.controllers");
const findBlogByIdAndAttach = require("../middlewares/findAndAttachBlog");

router.post("/new", createBlog);
router.get("/", getBlogs);

router
  .route("/:blogId") // clubbing of the routes
  .all(findBlogByIdAndAttach)
  .get(getBlogById)
  .delete(deleteBlogById)
  .patch(updateBlogById);

// router.get("/:blogId", getBlogById);
// router.delete("/:blogId", deleteBlogById);
// router.patch("/:blogId", updateBlogById);

module.exports = router;
