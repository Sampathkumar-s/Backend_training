const express = require("express");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/kongu")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Schema
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

// Model
const Person = mongoose.model("Data", dataSchema);

// POST API
router.post("/data", async (req, res) => {
    try {
        const newData = new Person(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ALL DATA
router.get("/getdata", async (req, res) => {
    try {
        const savedData = await Person.find();
        res.status(200).json(savedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET BY NAME
router.get("/data/:name", async (req, res) => {
    try {
        const savedData = await Person.findOne({ name: req.params.name });

        if (!savedData) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).json(savedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete("/data/:name", async (req, res) => {
    try {
        const deletedData = await Person.findOneAndDelete({
            name: req.params.name
        });

        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).json({
            message: "Data deleted successfully",
            deletedData
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Connect router
app.use("/api", router);

// Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
