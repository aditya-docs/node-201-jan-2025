const passport = require("passport");
const jwtStrategy = require("../config/passport");

passport.use(jwtStrategy);

module.exports = passport.authenticate("jwt", { session: false });
