const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
// middleware
app.use(express.json());
app.use(cors());

// Route Paths
const getCustomerData = require("./routes/getData");
const postCustomerData = require("./routes/postData");
// Routes
app.use("/", getCustomerData);
app.use("/", postCustomerData);
//Port Location
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.get("/", (req, res) => {
  try {
    res.status(200).send(`Hello World from the TeamPharr.Net Server`);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
