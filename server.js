const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");


// DB config
const mongodb = require("./config/keys").mongoURI;

// mongdb connect

// const uriKey =
//   "mongodb+srv://user:jabin123@testapp-epeov.mongodb.net/myApp?retryWrites=true";
mongoose
  .connect(mongodb, {
    useNewUrlParser: true
  })
  .then(result => {
    console.log("mongdb Connected");
  })
  .catch(err => console.log("Err connecting mongodb:", err));

const app = express();

// Apply body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize())
require('././config/passport')(passport);
// use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

app.get("/", (req, res) => res.send("Hello world Steffy ann john"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("App listening at port:", port));
