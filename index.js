const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const PORT =  4000;
const vendorRoutes=require("./routes/vendorRoutes");
const firmRoutes=require("./routes/firmRoutes")
const productRoutes=require("./routes/productRoutes")
const cors=require("cors");
mongoose.connect(process.env.MongoUrl).then(() => {
  console.log("successfully connected to the database")}).catch((err) => {
    console.log(err);
  });
app.use(bodyparser.json());
app.use(cors())
  app.use("/vendor",vendorRoutes);
  app.use("/firm",firmRoutes);
  app.use("/product",productRoutes);
app.use("/",(req,res)=>{
  res.send("Welcome to HUNGRIES")
})
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
