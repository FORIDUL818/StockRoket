const fs = require('fs');
const path = require('path');
const multer = require('multer');
const productModel = require("../Models/product/ProductModel");
const cloudinary = require("../Utility/cloudinary");
const detailsService = require('../Common/DetailsService');
const DropDownService = require('../Common/DropDownService');
const ListServiceTwo = require('../Common/ListServiceTwo'); 
//  import area up 


const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Allow only JPEG and PNG images
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  };
  

const upload = multer({
     storage: storage,
     limits: 1024*1024*10,//10 
     fileFilter:fileFilter
    }).array('images', 5); // Assuming multiple files upload
//  product create  start
exports.createProducts = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "fail", data: err }); // Corrected status code and status message
        }
        
        try {
            const body = req.body;
            const images = req.files.map((file) => file.path);
            
            const promises = images.map((imagePath) => {
                return cloudinary.uploader.upload(imagePath, {
                    folder: "productsimage",
                });
            });
            
            const uploadImage = await Promise.all(promises);
            const email = req.headers.email;
            
            const Product = await productModel.create({
                userEmail: email,
                name: body.name,
                details: body.details,
                unit: body.unit,
                images: uploadImage.map((img) => img.secure_url),
                categoryId: body.categoryId,
                brandId: body.brandId
            });
            
            res.status(201).json({ status: "success", data: Product });
        } catch (err) {
            res.status(500).json({ status: "fail", data: err });
        }
    });
};
//  product create end

// updateBrand start
exports.ProductsDetails=async(req,res)=>{
    try{
        const result= await detailsService(req,productModel)
       
         res.status(200).json({status:"success",data:result})
       
        
    }catch(err){
      res.status(200).json({status:"fail",data:err})
    }
    }
 // brand details end
 
//  updateBrand start
exports.updateProducts=async(req,res)=>{
    try{
      upload(req,res,async (err)=>{
        if(err){
            res.status(200).join({status:" fail",message:err.message})
        }

        // extract form data and files
        const body=req.body;
        const images =req.files.map(file=>file.path);

        let userEmail=req.headers.email;
        let id=req.params.id;

        let product =await productModel.findOne({_id:id,userEmail:userEmail});
        if(!product){
            return res.status(404).json({status:"fail",message:"Products not found"});
        }

        // delete old images from cloudinary 
        if(product.images && product.images.length>0){
            const deletePromises=product.images.map(imageUrl=>{

                // extract public id from image Url
                const publicId=imageUrl.split('/').pop().split('.')[0];
                return cloudinary.uploader.destroy(`productsimages/${publicId}`);
            });
            await Promise.all(deletePromises);
        }
        // upload new images to cloudinary 
        const uploadPromises=images.map(imagePath=>{
            return cloudinary.uploader.upload(imagePath,{
                folder:'productsimages'
            });
        });
        const uplodedImages = await Promise.all(uploadPromises)
        // Update product with new image URLs
        const updateData={
            name:body.name,
            unit:body.unit,
            details:body.details,
            images:uplodedImages.map(img=>img.secure_url),
            categoryId:body.categoryId,
            brandId:body.brandId
        };
        await productModel.updateOne({_id: id,userEmail:userEmail},updateData);
        return res.status(200).json({status:"successe",data:updateData})
      })
    }catch(err){
     res.status(200).json({status:"fail"})
    }
  }
//  updateBrand end
 
 // dropdwon start 
 exports.ProductsDropdwon=async(req,res)=>{
   const result= await DropDownService(req,productModel,{_id:1,name:1})
   res.status(200).json({status:"success",data:result,})
 }
 // dropdwon end
 // listSevice start 
  exports.Productslist = async (req, res) => {
  try {
      const searchKeyword = req.params.searchKeyword;
      const searchRegex = { $regex: searchKeyword, $options: "i" };

      const joinOnestage = { 
          $lookup: {
              from: "brands", 
              localField: "brandId", 
              foreignField: "_id", 
              as: "brand"
          }
      };

      const joinTwostage = { 
          $lookup: {
              from: "categoris", 
              localField: "categoryId", 
              foreignField: "_id", 
              as: "category"
          }
      };

      const array = [
          { name: searchRegex },
          { details: searchRegex },
          { unit: searchRegex },
          { 'brand.name': searchRegex },
          { 'category.name': searchRegex }
      ];

      const result = await ListServiceTwo(req, productModel, array, joinOnestage, joinTwostage);
      
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({ status: "fail", data: err.message });
  }
};

