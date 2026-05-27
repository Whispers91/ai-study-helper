const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Stable pdfjs-dist import (Node-safe)
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const app = express();

app.use(cors());
app.use(express.json());

// Storage Config
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "backend/uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

// Multer Setup
const upload = multer({ storage });

/**
 * Helper function: extract text from PDF
 */
async function extractTextFromPDF(filePath) {

  const data = new Uint8Array(fs.readFileSync(filePath));

  const loadingTask = pdfjsLib.getDocument({
    data,
    disableWorker: true,
  });

  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const pageText = content.items.map(item => item.str).join(" ");
    fullText += pageText + "\n";

  }

  return fullText;
}

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Upload Route
app.post("/upload", upload.single("pdf"), async (req, res) => {

  console.log(req.file);

  try {

    // ✅ CHECK IF FILE EXISTS
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    console.log(req.file);

    // Uploaded PDF path
    const filePath = req.file.path;

    console.log("Uploaded File Path", filePath);

    // Extract text using pdfjs
    const text = await extractTextFromPDF(filePath);

    console.log("Extracted Text", text);

    // Send extracted text to frontend
    return res.json({
      message: "PDF processed successfully",
      text
    });

  } catch (error) {

    console.log("Error", error);

    return res.status(500).json({
      message: "PDF processing failed",
    });

  }

});

// Server Start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});