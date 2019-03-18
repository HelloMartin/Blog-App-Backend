const   bodyParser      = require("body-parser"),
        methodOveride   = require ("method-override"),
        express         = require("express"),
        mongoose        = require("mongoose"),
        cors            = require('cors'),
        app             = express();

// MONGOOSE / MODEL CONFIG
const   Blog            = require("./models/blog");

// ROUTES
const 	blogRoutes	  	= require("./routes/blog");
const   userRoutes      = require("./routes/user");

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
app.use(cors());

// ROUTES
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

// SERVER LISTEN
app.listen(4300, 'localhost', function() {
    console.log("######################################################");
    console.log("----------------- SERVER IS RUNNING! -----------------");
    console.log(Date());
    console.log("######################################################");
});
