const Person = require("./models/Person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Authentication configuration
passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
    //   console.log("Recieved Credentials : ", USERNAME, PASSWORD);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username." });
      }
      // const isPasswordMatch = user.password === PASSWORD ? true : false;
      const isPasswordMatch = await user.comparePassword(PASSWORD);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;