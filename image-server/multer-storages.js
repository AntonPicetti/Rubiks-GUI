import multer from "multer";

const standardStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
            "-" +
            Date.now() +
            "." +
            file.originalname.split(".").pop()
        );
    },
});
export const standardUpload = multer({ storage: standardStorage });

const normalStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads-normal/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname
        );
    },
});
export const normalUpload = multer({ storage: normalStorage });

const segmentedStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads-segmented/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname
        );
    },
});
export const segmentedUpload = multer({ storage: segmentedStorage });