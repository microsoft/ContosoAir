const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: true,
      passReqToCallback: true
    },
    function(req, username, password, done) {
      if (!username) {
        req.flash('error', "Login.Error.MissingCredentials");
        return done(null, false);
      }

      return done(null, {
        name: username
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.name);
});

passport.deserializeUser(function(name, done) {
  done(null, { name });
});

module.exports = passport;