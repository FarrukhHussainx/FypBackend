const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const orders = require("../models/Orders");
const services = require("../models/Services");
const Customers = require("../models/Customers");
//get All customers
router.get("/orders", async (req, res) => {
  const notes = await orders.find({});
  res.json(notes);
});
//to get all notes of loged in company
router.get("/fetchallorders", fetchuser, async (req, res) => {
  const notes = await orders.find({ customer_id: req.user });
  res.json(notes);
});

//Create new order
router.post(
  "/createorder",
  fetchuser,
  [
    body("name", "enter a valid title").isLength({ min: 3 }),
    // body("description", "not less 5 charecter description").isLength({
    //   min: 5,
    // }),
  ],
  async (req, res) => {
    const { name, type, nameC, company_id, price } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let note1 = await Customers.findById(req.user);
    if (!note1) {
      return res.status(401).send("not found");
    }
    //console.log({ service: note1._id });
    //console.log({ nameC: note1.name });
    const d = new Date();
    let date = d.getDate();
    let month = d.getMonth();
    console.log(date, month);
    const note = new orders({
      name,
      type,
      nameC,
      nameU: note1.name,
      customerAddress: note1.address,
      customer_id: req.user,
      company_id,
      date: date,
      month: month,
      price,
      type,
    });
    const savedNote = await note.save();
    res.json(savedNote);
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
///////get all services by company id
router.get("/fetchallordersx/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const notes = await orders.find({ company_id: id });
  console.log(req.body);
  res.json(notes);
});
//Delete loged-in note of user
router.delete("/deleteOrder/:id", fetchuser, async (req, res) => {
  // const { title, description, tag } = req.body;

  // let note = await orders.findById(req.params.id);
  // if (!note) {
  //   return res.status(401).send("not found");
  // }
  // if (note.user.toString() !== req.user) {
  //   return res.status(401).send("not allowed");
  // }
  const note = await orders.findByIdAndDelete(req.params.id);
  res.json({ success: "Service deleted" });
});
module.exports = router;
