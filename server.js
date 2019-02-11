const   bodyParser      = require("body-parser"),
        methodOveride   = require ("method-override"),
        express         = require("express"),
        mongoose        = require("mongoose"),
        cors            = require('cors'),
        app             = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
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

// ROUTES
// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            res.status(400).send();
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
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.status(400).send();
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
            res.status(400).send();
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
            res.status(400).send();
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
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.status(400).send();
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
    Blog.findOneAndDelete(req.params.id, function(err){
        if(err){
            res.status(400).send();
        } else {
            res.status(200).send({
                message: "blog destroyed successfully"
            });
        }
    })
})

// SERVER LISTEN
app.listen(4300, 'localhost', function() {
    console.log("******************");
    console.log("SERVER IS RUNNING!");
    console.log("******************");
});