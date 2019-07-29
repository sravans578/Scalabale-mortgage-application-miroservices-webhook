module.exports = function(req, res, next) {
  console.log("request",req);
  console.log("entered authentication");
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(403).send({
      message: 'Not Authorized'
    });
  }
};
