const 	express 	= require("express"),
    		router		= express.Router();

// ROUTES
router.post("/authenticate", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  if (username === "Martin" && password === "password") {
    res.status(200).send({
        message: "login successfully",
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnRpbiBWb2d0IiwiaWF0IjoxNTE2MjM5MDIyfQ.VykYmXFL8Sl8ERayjrpRg3prWFFhz3SLQAxJrQId6Bw'
    });
  } else {
    res.status(401).send({
      error: "bad credentials"
    });
  }
})

module.exports = router;
