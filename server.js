const   bodyParser      = require("body-parser"),
        methodOveride   = require ("method-override"),
        express         = require("express"),
        mongoose        = require("mongoose"),
        cors            = require('cors'),
        app             = express();

// MONGOOSE / MODEL CONFIG
const   Blog            = require("./models/blog"),
        User            = require("./models/user");

// ROUTES
const 	blogRoutes	  	= require("./routes/blog"),
        userRoutes      = require("./routes/user");

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
app.use(cors());

// ROUTES
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

//User.create({"username":"tbz","password":"tbz","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InRieiIsImlhdCI6MTUxNjIzOTAyMn0.zcZHNiZSLjyrVXKoMPIAeB0OmWxu0Rpm_stGsMsJHpk"});

// SERVER LISTEN
app.listen(4300, 'localhost', function() {
    console.log("######################################################");
    console.log("----------------- SERVER IS RUNNING! -----------------");
    console.log("------------------ BLOG-APP-BACKEND! -----------------");
    console.log(Date());
    console.log("######################################################");
});
