import multer, { Multer } from "multer";
import CustomError from "@/utils/customError";
import { ALLOWED_FILE_TYPE, MAX_FILE_SIZE } from "@/constants";

/**
 * Multer middleware for uploading files.
 *
 * @constant
 * @type {Multer}
 */
const upload: Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.size > MAX_FILE_SIZE) {
      cb(new CustomError("Please upload file under 2MB.", 413));
    } else if (!ALLOWED_FILE_TYPE.includes(file.mimetype)) {
      cb(
        new CustomError(
          "Invalid file type. Only .jpg, .jpeg and .png files are allowed!",
          400
        )
      );
    } else {
      cb(null, true);
    }
  },
});

export default upload;
