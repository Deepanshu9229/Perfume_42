

//Multer is a middleware for handling multipart/form-data, used for file uploads
//diskStorage: Stores the uploaded files on disk (your local server). 
import multer from "multer";

const storage = multer.diskStorage({
    filename:function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload