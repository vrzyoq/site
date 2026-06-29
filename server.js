const express = require("express");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// test
app.get("/api/test", (req, res) => {
    res.json({ message: "backend works" });
});

// fallback to SPA
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// запуск
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});