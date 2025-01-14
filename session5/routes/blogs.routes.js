const router = require("express").Router();
const { createBlog } = require("../controllers/blogs.controllers");

router.post("/new", createBlog);

module.exports = router;
