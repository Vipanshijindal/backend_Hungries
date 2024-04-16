const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/firm");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); //generating unique file name
  },
});
const upload = multer({ storage });
const addProduct = async (req, res) => {
  try {
    const { productname, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId=req.params.firmId
    const firm = await Firm.findById(firmId);
    if (!firm) {
      res.status(404).json({ message: "firm not found" });
    }
    const product = new Product({
      productname,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });
    const savedproduct = await product.save();
   firm.product.push(savedproduct);
    await firm.save();
    return res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};


const getProductbyFirm=async(req,res)=>{
  try{
    const firmId=req.params.firmId
    const firm = await Firm.findById(firmId);
    if (!firm) {
      res.status(404).json({ message: "firm not found" });
    }
    const products=await Product.find({firm:firmId})
    res.status(200).json(products)

  }catch(error){
    console.log(error);
    res.status(500).json("Internal server error");
  }
}
module.exports = {addProduct:[upload.single('image'),addProduct],getProductbyFirm};
