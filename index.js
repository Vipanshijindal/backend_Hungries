const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const PORT = 4000;
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");


const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to HUNGRIES");
});
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
