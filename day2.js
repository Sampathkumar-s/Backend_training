const express = require("express");
const app = express();
const port = 5550;


app.use(express.json());


let users = [
    { id: 1, name: "sampath", age: 21, city: "nkl" },
    { id: 2, name: "kumar", age: 22, city: "erode" },
    { id: 3, name: "arun", age: 23, city: "salem" }
];

let nextId = 4;

app.get("/", (req, res) => {
    res.json(users);
});


app.post("/add", (req, res) => {
    const { name, age, city } = req.body;

   

    const newUser = {
        id: nextId++,
        name,
        age: parseInt(age),
        city
    };

    users.push(newUser);
    res.json(newUser);
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
