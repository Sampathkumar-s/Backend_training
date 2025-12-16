const express = require("express");
const app = express();
const port = 5550;

// Middleware to parse JSON safely
app.use(express.json());

// In-memory data
let users = [
    { id: 1, name: "sampath", age: 21, city: "nkl" },
    { id: 2, name: "kumar", age: 22, city: "erode" },
    { id: 3, name: "arun", age: 23, city: "salem" }
];

let nextId = 4;

/**
 * GET: Fetch all users
 */
app.get("/", (req, res) => {
    res.status(200).json(users);
});

/**
 * GET: Fetch user by city
 */
app.get("/alldata/:city", (req, res) => {
    const city = req.params.city;

    const user = users.find(u => u.city === city);

    if (!user) {
        return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(user);
});

/**
 * POST: Add a new user
 */
app.post("/add", (req, res) => {
    // Protect against empty or invalid JSON
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }

    const { name, age, city } = req.body;

    // Validation
    if (!name || !age || !city) {
        return res.status(400).json({
            message: "name, age, and city are required"
        });
    }

    const newUser = {
        id: nextId++,
        name,
        age: Number(age),
        city
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        data: newUser
    });
});

/**
 * DELETE: Remove user by ID
 */
app.delete("/alldata/:id", (req, res) => {
    const id = Number(req.params.id);

    const initialLength = users.length;
    users = users.filter(u => u.id !== id);

    if (users.length === initialLength) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
});

/**
 * Server start
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
