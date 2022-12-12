const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Customers");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const JWT_SECRET = "itsfarrukh";
router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "sorry a user with email already exists" });
    }
    //encription
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: secPass,
    });
    //JWT
    const data = {
      id: user.id,
    };
    var token = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.json({ success, token });
  }
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password can,t be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "plz try with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: success,
          error: "plz try with correct credentials",
        });
      }
      const data = {
        id: user.id,
      };
      var token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
    } catch (error) {
      res.status(500).send("catch block");
    }
  }
);
//get user
router.post("/getlogedone", fetchuser, async (req, res) => {
  try {
    console.log(req.user);
    UserId = req.user;
    const user = await User.findById(UserId).select("-password");
    res.send(user);
  } catch (error) {
    console.log;
    res.status(500).json({ error: error.message });
  }
});

//get All customers
router.get("/getallcustomers", async (req, res) => {
  const notes = await User.find({});
  res.json(notes);
});
module.exports = router;
