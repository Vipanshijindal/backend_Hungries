const firmController=require("../controllers/firmController");
const express=require("express");
const router=express.Router();
const verifyToken=require("../middlewares/verifyToken")

router.post("/addfirm",verifyToken,firmController.firmController);

// router.post("/login",firmController.vendorLogin)


module.exports=router;