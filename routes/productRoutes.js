const productController=require("../controllers/productController");
const express=require("express");
const router=express.Router();
router.post("/addproduct/:firmId",productController.addProduct);

router.get("/:firmId/products",productController.getProductbyFirm);
module.exports=router;