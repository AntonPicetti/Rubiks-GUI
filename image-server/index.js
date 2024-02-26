import express from "express";
import cors from "cors";
import { standardUpload, normalUpload, segmentedUpload, fixedClassificationUpload } from "./multer-storages.js";
const app = express();

// Enable CORS for all routes
app.use(cors());


app.post("/upload-normal-image", normalUpload.single("image"), (req, res) => {
  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

app.post("/upload-segmented-image", segmentedUpload.single("image"), (req, res) => {
  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

app.post("/upload-fixed-classification-image", fixedClassificationUpload.single("image"), (req, res) => {
  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

app.post("/upload", standardUpload.single("image"), (req, res) => {
  const sides = JSON.parse(req.body.sides);
  console.log(sides);

  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

