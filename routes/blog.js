const 	express 	= require("express"),
    		router		= express.Router(),
    		Blog 	    = require("../models/blog");

// ROUTES
// INDEX ROUTE
router.get("/", function(req, res){
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
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
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
router.get("/:id/edit", function(req, res){
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
router.put("/:id", function(req, res){
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
router.delete("/:id", function(req, res){
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

module.exports = router;
