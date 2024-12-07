import fs from "node:fs";
import multer from "multer";

const mediaDir = "src/media";
// console.log(fs.existsSync(mediaDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, mediaDir)
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        // console.log(req.body);
        // console.log(originalname);
        cb(null, originalname)
    }
})

const upload = multer({ storage: storage });
export default upload;
export {
    mediaDir
}
