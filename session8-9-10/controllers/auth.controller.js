const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const postSignup = async (req, res) => {
  try {
    res.send(await AuthServiceInstance.signup(req.body));
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again." });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserServiceInstance.findByUsername(username);
    if (!user) return res.status(404).send({ message: "User not found!" });
    const isLoggedIn = await AuthServiceInstance.comparePassword(
      password,
      user.password
    );
    if (!isLoggedIn) return res.sendStatus(401);
    res
      .status(200)
      .cookie(
        "remember_user_token",
        AuthServiceInstance.generateJwt({ userId: user._id }),
        { maxAge: 15 * 60 * 1000, httpOnly: true }
      )
      .send({ isLoggedIn });
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = { postSignup, postLogin };
