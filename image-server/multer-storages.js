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

const fixedClassificationStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads-fixed-classification/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname
        );
    },
});
export const fixedClassificationUpload = multer({ storage: fixedClassificationStorage });

const colorLabelStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads-color-labels/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname
        );
    },
});
export const colorLabelsUpload = multer({ storage: colorLabelStorage });

const pieceStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads-piece-classification/"); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname
        );
    },
});
export const pieceUpload = multer({ storage: pieceStorage });