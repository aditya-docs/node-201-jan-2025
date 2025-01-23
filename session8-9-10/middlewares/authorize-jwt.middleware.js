const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
const AuthServiceInstance = new AuthService();
const UserServiceInstance = new UserService();

const authorize = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const { userId } = AuthServiceInstance.verifyJwt(token);
    const reqUser = await UserServiceInstance.findById(userId);
    if (!reqUser)
      return res
        .status(403)
        .send({ message: "You cannot use this resource at the moment." });
    req.user = reqUser;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = authorize;
