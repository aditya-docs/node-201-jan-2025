const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");
const verifyAuth = require("../middlewares/authorize");
const userSearchSchema = require("../validations/users.validator");
const {
  userSearchValidator, // specific to "user search"
  queryValidator, // generic function to validate query params
} = require("../middlewares/validator");

router.get("/", verifyAuth, getUsers);

router.get(
  "/search",
  verifyAuth,
  queryValidator(userSearchSchema),
  searchUsers
);

router.get("/:uuid", getUserById);

module.exports = router;
