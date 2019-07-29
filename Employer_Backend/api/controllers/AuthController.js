/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
module.exports = {
login: function(req, res) {
  console.log("entered here");
    passport.authenticate('local', function(err, user, info){
      console.log("err",err,"user",user,"info",info);
      if((err) || (!user)) {
        return res.send({
          message: "invalid user name or password",
          user
        });
      }
      console.log(user);
req.logIn(user, function(err) {
        if(err) res.send(err);
        return res.send({
          message: "Successfully logged in",
          user
        });
      });
    })(req, res);
  },
logout: function(req, res) {
    req.logout();
    res.send({
      message: 'logout successful'
    });
    // res.redirect('/');
  }
};
