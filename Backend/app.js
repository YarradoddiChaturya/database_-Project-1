
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors({
    origin: "http://localhost",
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "User Management Backend Running"
    });
});

app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT 1 AS connected");

        res.json({
            status: "success",
            database: rows[0].connected === 1 ? "connected" : "unknown"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
