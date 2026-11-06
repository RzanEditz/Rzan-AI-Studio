const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }
});

app.get("/", (req, res) => {
  res.send("RZAN AI STUDIO Backend is Running!");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to RZAN AI STUDIO",
    developer: "Ramesh Menat",
    brand: "RZAN EDITZ"
  });
});

app.post(
  "/api/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "music", maxCount: 1 },
    { name: "reference", maxCount: 1 }
  ]),
  (req, res) => {
    res.json({
      success: true,
      message: "Files uploaded successfully!",
      files: {
        video: req.files.video?.[0]?.filename || null,
        music: req.files.music?.[0]?.filename || null,
        reference: req.files.reference?.[0]?.filename || null
      }
    });
  }
);

app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message || "Upload failed"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RZAN AI STUDIO running on port ${PORT}`);
});
