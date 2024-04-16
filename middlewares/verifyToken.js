const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SecretKey;
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, secretkey);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      res.status(404).json({ error: "Vendor not Found" });
    }
    req.vendorId=vendor._id
    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
};
module.exports = verifyToken;
