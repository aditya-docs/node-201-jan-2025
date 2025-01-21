const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const UserService = require("./user.service");
const UserServiceInstance = new UserService();

class AuthService {
  signup = async (payload) =>
    UserServiceInstance.register({
      ...payload,
      password: await this.generatePasswordHash(payload.password),
    });

  generatePasswordHash = (password) => bcrypt.hash(password, 10);

  comparePassword = (plainTextPassword, hashedPassword) =>
    bcrypt.compare(plainTextPassword, hashedPassword);

  generateJwt = (payload) =>
    Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
}

module.exports = AuthService;
