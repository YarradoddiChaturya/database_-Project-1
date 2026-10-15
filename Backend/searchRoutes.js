const express = require("express");
const db = require("./db");

const router = express.Router();

const columns = `
    username, firstname, lastname,
    salary, age, registerday, signintime
`;

router.get("/search", async (req, res) => {
    try {
        const { type, value1 = "", value2 = "" } = req.query;
        let sql;
        let params = [];

        switch (type) {

            // 1. Search by first and/or last name
            case "name":
                if (!value1.trim() && !value2.trim()) {
                    return res.status(400).json({
                        message: "Enter at least one name."
                    });
                }

                sql = `SELECT ${columns} FROM Users
                       WHERE (? = '' OR firstname LIKE CONCAT('%', ?, '%'))
                         AND (? = '' OR lastname LIKE CONCAT('%', ?, '%'))`;

                params = [value1, value1, value2, value2];
                break;

            // 2. Search by userid
            case "userid":
                sql = `SELECT ${columns} FROM Users
                       WHERE username = ?`;

                params = [value1];
                break;

            // 3. Search by salary range
            // 4. Search by age range
            case "salary":
            case "age": {
                if (value1 === "" || value2 === "") {
                    return res.status(400).json({
                        message: "Both minimum and maximum are required."
                    });
                }

                const min = Number(value1);
                const max = Number(value2);

                if (!Number.isFinite(min) ||
                    !Number.isFinite(max) ||
                    min < 0 || max < 0 || min > max ||
                    (type === "age" &&
                    (!Number.isInteger(min) || !Number.isInteger(max)))) {
                    return res.status(400).json({
                        message: "Invalid range."
                    });
                }

                const field = type === "salary" ? "salary" : "age";

                sql = `SELECT ${columns} FROM Users
                       WHERE ${field} BETWEEN ? AND ?`;

                params = [min, max];
                break;
            }

            // 5. Registered after a specified user
            case "after":
                sql = `SELECT ${columns} FROM Users
                       WHERE registerday >
                       (SELECT registerday FROM Users
                        WHERE username = ?)`;

                params = [value1];
                break;

            // 6. Never signed in
            case "never":
                sql = `SELECT ${columns} FROM Users
                       WHERE signintime IS NULL`;
                break;

            // 7. Registered on the same day
            case "same":
                sql = `SELECT ${columns} FROM Users
                       WHERE registerday =
                       (SELECT registerday FROM Users
                        WHERE username = ?)`;

                params = [value1];
                break;

            // 8. Registered today
            case "today":
                sql = `SELECT ${columns} FROM Users
                       WHERE registerday = CURDATE()`;
                break;

            default:
                return res.status(400).json({
                    message: "Invalid search type."
                });
        }

        const [users] = await db.execute(sql, params);
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Search failed."
        });
    }
});

module.exports = router;