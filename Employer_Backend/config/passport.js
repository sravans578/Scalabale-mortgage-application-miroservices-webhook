const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
    //   bcrypt = require('bcrypt-nodejs');
passport.serializeUser(function(user, cb) {
  console.log(user);
  cb(null, user.employeeID);
});
passport.deserializeUser(function(id, cb){
  Employer.findOne({"employeeID": id}, function(err, users) {
    cb(err, users);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'employeeID',
  passwordField: 'password'
}, function(username, password, cb){
    console.log("username"+ username,"password" + password);
Employer.findOne({"employeeID": username}, function(err, user){
  console.log("***********",user);
    if(err) return cb(err);
    if(!user) return cb(null, false, {message: 'Username not found'});
if(password != user.password){
       return cb(null, false, { message: 'Invalid Password' });
}
 else{

// let userDetails = {
//         employeeID: user.employeeID,
//       };
// res.cookie('name', 'tobi', { signed: true });
return cb(null, user);
    }

    });
  }));