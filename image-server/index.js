import express from "express";
import cors from "cors";
import { standardUpload, normalUpload, segmentedUpload, fixedClassificationUpload, colorLabelsUpload, pieceUpload } from "./multer-storages.js";
import { updateJsonFile } from "./update-json.js";
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

app.post("/upload-color-label-image", colorLabelsUpload.single("image"), (req, res) => {
  res.json({ message: "Successfully uploaded " + req.file.originalname });
});

app.post("/upload-piece-classification", pieceUpload.single("image"), (req, res) => {
  const {classificationIndex} = JSON.parse(req.body.label);

  updateJsonFile("./piece-classifications.json", req.file.originalname, classificationIndex, (err) => {
    if (err) {
      // Handle the error appropriately
      console.error('Failed to update the file:', err);
      return res.status(500).json({ message: "Failed to upload " + req.file.originalname });
    }
    // Send the response after the file has been successfully updated
    res.json({ message: "Successfully uploaded " + req.file.originalname });
  });
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

