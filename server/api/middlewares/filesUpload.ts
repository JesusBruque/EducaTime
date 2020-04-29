import multer from 'multer';

const fileUpload = () => {
    const storage = multer.diskStorage({
        destination : 'uploads/',
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    return multer({ storage: storage });
}

const upload = fileUpload();

export default upload;
