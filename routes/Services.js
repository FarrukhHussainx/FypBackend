const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Services = require("../models/Services");
const companies = require("../models/Companies");
//get All customers
router.get("/getallservices", async (req, res) => {
  const notes = await Services.find({});
  res.json(notes);
});
//to get all notes of loged in company
router.get("/fetchallservices", fetchuser, async (req, res) => {
  const notes = await Services.find({ company_id: req.user });
  console.log(req.user);
  res.json(notes);
});
///////////////////////////
router.get("/fetchallservicesx/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await Services.find({ company_id: id });
  console.log(req.body);
  res.json(notes);
});
router.post(
  "/createservice",
  fetchuser,
  [
    body("name", "enter a valid title").isLength({ min: 3 }),
    // body("description", "not less 5 charecter description").isLength({
    //   min: 5,
    // }),
  ],
  async (req, res) => {
    const { name, iprice, dprice } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.user);
    let note1 = await companies.findById(req.user);
    if (!note1) {
      return res.status(401).send("not found");
    }
    console.log(note1);
    console.log("object");
    const img = name;
    const imgs = img.toLowerCase();
    console.log(imgs);
    if (imgs === "welder") {
      const rating = 11;
      const note = new Services({
        name,
        iprice,
        dprice,
        rating,
        company_id: req.user,
        nameC: note1.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } else if (imgs === "plumber") {
      const rating = 12;
      const note = new Services({
        name,
        iprice,
        dprice,
        rating,
        company_id: req.user,
        nameC: note1.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } else if (imgs === "engineer") {
      const rating = 13;
      const note = new Services({
        name,
        iprice,
        dprice,
        rating,
        company_id: req.user,
        nameC: note1.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } else if (imgs === "carpenter") {
      const rating = 14;
      const note = new Services({
        name,
        iprice,
        dprice,
        rating,
        company_id: req.user,
        nameC: note1.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } else if (imgs === "maid") {
      const rating = 15;
      const note = new Services({
        name,
        iprice,
        dprice,
        rating,
        company_id: req.user,
        nameC: note1.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    }
    // console.log(Iname);
  }
);
//update loged-in note of user
router.put("/updateservice/:id", fetchuser, async (req, res) => {
  const { name, iprice, dprice } = req.body;
  let newNote = {};
  if (name) {
    newNote.name = name;
  }
  if (iprice) {
    newNote.iprice = iprice;
  }
  if (dprice) {
    newNote.dprice = dprice;
  }
  let note = await Services.findById(req.params.id);
  if (!note) {
    return res.status(401).send("not found");
  }
  // if (note.user.toString() !== req.user) {
  //   return res.status(401).send("not allowed");
  // }
  note = await Services.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
//Delete loged-in note of user
router.delete("/deleteservice/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  let note = await Services.findById(req.params.id);
  if (!note) {
    return res.status(401).send("not found");
  }
  // if (note.user.toString() !== req.user) {
  //   return res.status(401).send("not allowed");
  // }
  note = await Services.findByIdAndDelete(req.params.id);
  res.json({ success: "Service deleted" });
});
module.exports = router;
