
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {
            username, password, firstname,
            lastname, salary, age
        } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof firstname !== "string" ||
            typeof lastname !== "string" ||
            !username.trim() ||
            !firstname.trim() ||
            !lastname.trim() ||
            password.length < 8
        ) {
            return res.status(400).json({
                message: "Valid username, names, and password of at least 8 characters are required."
            });
        }

        const parsedAge = Number(age);
        const parsedSalary = Number(salary);

        if (!Number.isInteger(parsedAge) || parsedAge < 0 || parsedAge > 120 ||
            !Number.isFinite(parsedSalary) || parsedSalary < 0) {
            return res.status(400).json({
                message: "Enter a valid age and salary."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await db.execute(
            `INSERT INTO Users
             (username, password_hash, firstname, lastname,
              salary, age, registerday, signintime)
             VALUES (?, ?, ?, ?, ?, ?, CURDATE(), NULL)`,
            [
                username.trim(),
                passwordHash,
                firstname.trim(),
                lastname.trim(),
                parsedSalary,
                parsedAge
            ]
        );

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        console.error(error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (typeof username !== "string" ||
            typeof password !== "string") {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const [users] = await db.execute(
            "SELECT username, password_hash FROM Users WHERE username = ?",
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password, users[0].password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        await db.execute(
            "UPDATE Users SET signintime = NOW() WHERE username = ?",
            [username]
        );

        req.session.username = users[0].username;

        res.json({
            message: "Login successful",
            username: users[0].username
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
});

module.exports = router;
