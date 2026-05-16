const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// статика
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API
app.get("/api/test", (req, res) => {
    res.json({
        message: "backend works"
    });
});

// запуск
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});