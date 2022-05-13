const express = require('express');
const router = express.Router();
const multer = require('multer')
const CarController = require('../Controllers/CarController');
const path = require('path')
// const auth = require("../middleware/Auth");

let imageName = "";
var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/src/public/storage')
    },
    filename: function (req, file, cb) {
        imageName = Date.now() + path.extname(file.originalname);
        console.log("jthfjfhjfk",imageName);
      cb(null, file.fieldname+"_"+Date.now()+file.originalname);
    }

    
})
var upload = multer({ storage: storage })


router.use(express.static(__dirname + '/public'));
router.use('/uploads', express.static('uploads'));

router.post('/createCarss', upload.single('image'), CarController.CreateCar);
router.post('/getAllProducts', CarController.FetchAllCars);
router.post('/filterProducts', CarController.JoinProductsWithUser);
module.exports = router;