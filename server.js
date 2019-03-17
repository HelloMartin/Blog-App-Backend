const   bodyParser      = require("body-parser"),
        methodOveride   = require ("method-override"),
        express         = require("express"),
        mongoose        = require("mongoose"),
        cors            = require('cors'),
        app             = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
app.use(cors());

// MONGOOSE / MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

const Blog = mongoose.model("Blog", blogSchema);

// LOGIN
app.post("/login", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  if (username === "Martin" && password === "1234") {
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

// ROUTES
// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            res.status(400).send({
              error: err
            });
        } else {
            res.status(200).send({
                message: "blogs retrieved successfully",
                blogs: blogs
            });
        }
    });
});
// CREATE ROUTE
app.post("/blogs", function(req, res){
Blog.create(req.body , function(err, newBlog){
       if(err){
           res.status(400).send({
             error: err
           });
       } else {
           res.status(200).send({
               message: "blog created successfully",
               blog: newBlog
           });
       }
    });
});
// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.status(400).send({
              error: err
            });
        } else {
            res.status(200).send({
                message: "blog retrieved successfully",
                blog: foundBlog
            });
        }
    });
});
// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.status(400).send({
              error: err
            });
        } else {
            res.status(200).send({
                message: "blog retrieved successfully",
                blog: foundBlog
            });
        }
    });
});
// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedBlog){
        if(err){
            res.status(400).send({
              error: err
            });
        } else {
            res.status(200).send({
                message: "blog updated successfully",
                blog: updatedBlog
            });
        }
    });
});
// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findOneAndDelete({ _id: req.params.id }, function(err){
        if(err){
            res.status(400).send({
              error: err
            });
        } else {
            res.status(200).send({
                message: "blog destroyed successfully"
            });
        }
    })
})

// SERVER LISTEN
app.listen(4300, 'localhost', function() {
    console.log("######################################################");
    console.log("----------------- SERVER IS RUNNING! -----------------");
    console.log(Date());
    console.log("######################################################");
});
