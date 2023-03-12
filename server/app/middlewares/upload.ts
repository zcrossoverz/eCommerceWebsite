import multer from "multer";
import * as time from "../utils/time";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        const path_upload = `uploads/images/${time.getYear()}/${time.getMonth()}`;
        fs.mkdirSync(path.join("./public", path_upload), { recursive:true });
        next(null, path_upload);
    },
    filename: (req, file, next) => { 
        next(null, `${time.getDay()}_${time.getHours()}_${time.getMinutes()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;
