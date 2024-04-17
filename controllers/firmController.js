const Vendor = require("../models/Vendor");
const multer = require("multer");
const Firm = require("../models/Firm");
const path=require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname)); //generating unique file name
  },
});
const upload = multer({ storage });
const firmController = async (req, res) => {
    try{
        const { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if(!vendor){
            res.status(404).json({message:"Vendor not found"})
        }
        const firm = new Firm({
          firmname,
          area,
          category,
          region,
          offer,
          image,
          vendor: vendor._id,
        });
         const savedfirm = await firm.save();
         vendor.firm.push(savedfirm);
         await vendor.save();
        return res.status(200).json({message:"Firm added successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }

};


module.exports = {firmController:[upload.single('image'),firmController]};
