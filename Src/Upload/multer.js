const multer = require('multer');
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
    }).array('images', 10);

    module.exports=upload