var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var known = process.env.KNOWN_USERS.split('-');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'photos'],

    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          if (known.indexOf(profile.id) === -1) return done(err);
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos ? profile.photos[0].value : '/assets/images/user.jpg',
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });
          user.save(function(err) {
            if (err) return done(err);
            done(err, user);
          });
        } else {
          return done(err, user);
        }
      })
    }
  ));
};
