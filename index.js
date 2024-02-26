const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");

app.use(express.static("public"));
app.set('view engine', 'ejs');


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





const startServer = async () => {
    try {
           mongoose.connect("mongodb://localhost:27017/ejsLearning").then(() => {
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