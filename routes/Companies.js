const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Companies");
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
    let ntn = await User.findOne({ ntn: req.body.ntn });
    if (ntn) {
      return res
        .status(400)
        .json({ error: "sorry a user with ntn already exists" });
    }
    //encription
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    if (!req.body.rating) {
      req.body.rating = 0;
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      ntn: req.body.ntn,
      status: "disable",
      rating: req.body.rating,
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
      res.json({ success, token, id: user.id });
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
router.get("/getallcompanies", async (req, res) => {
  const notes = await User.find({});
  res.json(notes);
});
////////////////////
router.put("/updatecompany/:id", async (req, res) => {
  const { status } = req.body;
  let newNote = {};
  if (status) {
    newNote.status = status;
  }

  let note = await User.findById(req.params.id);
  if (!note) {
    return res.status(401).send("not found");
  }
  // if (note.user.toString() !== req.user) {
  //   return res.status(401).send("not allowed");
  // }
  note = await User.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
module.exports = router;
