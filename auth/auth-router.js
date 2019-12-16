const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../jokes/jokes-model");

router.post("/register", (req, res) => {
  // implement registration
  const { username, password } = req.body;
  Users.add({ username, password: bcrypt.hashSync(password, 10) })
    .then(id => {
      res.status(201).json({ message: "User registered", id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Please try again" });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}! have a good time` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
