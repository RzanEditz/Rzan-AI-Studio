
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RZAN AI STUDIO running on port ${PORT}`);
});
