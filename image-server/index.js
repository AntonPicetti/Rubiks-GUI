import express from "express";
import multer from "multer";
import cors from "cors";
const app = express();

// Enable CORS for all routes
app.use(cors());

// Configure storage for Multer
const storage = multer.diskStorage({
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

const upload = multer({ storage: storage });

// Route to upload images
app.post("/upload", upload.single("image"), (req, res) => {
  const sides = JSON.parse(req.body.sides);
  console.log(sides);

  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
