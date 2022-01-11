require("dotenv").config();
const path = require("path");
const express=require('express');
const app = express();
const bodyParser = require("body-parser");
const { PORT, MONGODB_URI } = process.env;

app.get("/",(req,res)=>{
    res.send("hello-world")
});


app.listen(PORT, () => {
    console.log(
        `Example app listening at http://localhost:${PORT}`,
        //chalk.green("✓")
    );
});