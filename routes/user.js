const 	express 	= require("express"),
        router		= express.Router(),
        User      = require("../models/user");

//AUTHENTICATION
router.post("/authenticate", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username }, function(err, user){
      if(err || user == null){
          res.status(200).send({
            error: "no user found"
          });
      } else {
        if (user.username === username && user.password === password) {
          res.status(200).send({
              message: "login successfully",
              token: user.token
          });
        } else {
          res.status(200).send({
            error: "bad credentials"
          });
        }
      }
  });
});

module.exports = router;
