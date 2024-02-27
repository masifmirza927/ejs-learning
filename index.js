const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const Post = require("./models/Post");
var bodyParser = require('body-parser')
var flash = require('connect-flash');
const session = require('express-session');


app.use(express.static("public"));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'asdfas34234ssdd',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.get("/", (req, res) => {

    const name = "ali";
    const title = "Home page";
    return res.render("index", {
        name: name,
        title: title
    });

})

app.get("/about", (req, res) => {
    
    return res.render("about", {
        title: "About Page"
    });

})

app.get("/blog", async (req, res) => {

    const posts = await Post.find({});
    return res.render("blog", {posts: posts, message: req.flash('message')});
});

app.get("/blog/create/form", async (req, res) => {
    try {
        return res.render("createForm")
    } catch (error) {
        
    }
})



app.post("/blog/create", async (req, res) => {
    try {
      // create post
      const newPost = await Post.create({ content: req.body.content, imageUrl: req.body.imageUrl, authorId: "65d062156905c4d23b92e678" });
      
      req.flash('message', 'Post successfully created');
      return res.redirect("/blog");
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/:page", async (req, res) => {

    return res.render(`${req.params.page}`);
 });






const startServer = async () => {
    try {
           mongoose.connect("mongodb+srv://reduxInstagram:LdNlmnXDoCw0WaeG@cluster0.v68wujg.mongodb.net/reduxInstagram").then(() => {
            //mongoose.connect(process.env.MONGO_DB_CONNECT_URL).then(() => {
            app.listen(4003, () => {
                console.log(`server is listening on port 4003`);
            })
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();