const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "images/");
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        // if(!file.originalname.match(/\.(png|jpg)$/)) {
            callback(null, true);    
        } else {
            console.log("Only jpg and png file supported!!!");
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
        // fileSize: 1000000 // 1000000 Bytes = 1 MB
    }
});

module.exports = upload;