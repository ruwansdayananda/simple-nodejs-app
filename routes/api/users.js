const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../../models/User");
const keys = require("./../../config/keys");

const router = express.Router();

// API for GET
// @Author: Steffy Ann John
// description: Just checking the GET API for users.
router.get("/test", (req, res) =>
  res.json({
    message: "User Api Works"
  })
);

// API for POST
// @Author: Steffy Ann John
// description: POST API for signup/Registeration.
router.post("/signUp", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// API for GET
// @Author: Steffy Ann John
// description: GET API for Login.

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        };
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              message: "Success",
              token: "Bearer" + token
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Password Incorrect" });
      }
    });
  });
});

module.exports = router;
