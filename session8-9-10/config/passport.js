const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const UserService = require("../services/user.service");

const UserServiceInstance = new UserService();

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const jwtStrategy = new JWTStrategy(options, async ({ userId }, done) => {
  try {
    const user = await UserServiceInstance.findById(userId);
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

module.exports = jwtStrategy;
