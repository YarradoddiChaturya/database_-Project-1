
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./db");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors({
    origin: "http://localhost",
    credentials: true
}));

app.use(express.json());

if (!process.env.SESSION_SECRET ||
    process.env.SESSION_SECRET.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}));

app.get("/api/health", async (req, res) => {
    try {
        await db.execute("SELECT 1");
        res.json({ status: "success", database: "connected" });
    } catch (error) {
        res.status(500).json({
            status: "error",
            database: "disconnected"
        });
    }
});

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
