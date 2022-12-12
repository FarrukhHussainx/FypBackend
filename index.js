const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
// hee
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/customers", require("./routes/Customers"));
app.use("/api/companies", require("./routes/Companies"));
app.use("/api/services", require("./routes/Services"));
app.use("/api/orders", require("./routes/Orders"));
app.use("/api/workers", require("./routes/Worker"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
