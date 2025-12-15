const express = require('express');
const app = express();
const port = 3009;
const data = [{
    "name": "darkprince",
    "passwd": "darkprince123",
    "city": "Erode",
    "age": 21,
    "phone": 1234567890
},
{
    "name": "sampath",
    "passwd": "sampath123",
    "city": "Erode",
    "age": 21,
    "phone": 1234567890
}];

app.get("/", (req, res) => {
  res.json({"msg":"user data fetch successfully", data});
});

app.listen(port , () => {
  console.log(`Server is running at http://localhost:${port}`);
});