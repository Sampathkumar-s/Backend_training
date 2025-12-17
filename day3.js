const express = require("express");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/kongu")
.then(() => console.log("MongoDB is connected"))
.catch(err => console.log("MongoDB error:", err));

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const Person = mongoose.model("Data", dataSchema);

// POST API
router.post("/data", async (req, res) => {
    try {
        const newData = new Person(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Connect router
app.use("/api", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
