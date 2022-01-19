require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = process.env;
const BMW = require("./models/bmw");


const bmwController = require("./controllers/crud");
const searchapiController = require("./controllers/api/search")
const res = require("express/lib/response");

app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }));


app.set("view engine", "ejs");


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running.",
        chalk.red("✗")
    );
    process.exit();
});



app.get("/", (req, res) => {
    res.render("index");
});


app.get("/listing",bmwController.list);
app.get("/listing/delete/:_id", bmwController.delete);


app.get("/update/:id", bmwController.edit);
app.post("/update/:id", bmwController.editView);


app.get("/create", (req,res) =>{
    res.render("create");
});
app.post("/create" ,bmwController.create);


app.get("/search", searchapiController.get);
app.post("/search", searchapiController.post);

app.listen(PORT, () => {
    console.log(
        `Example app listening at http://localhost:${PORT}`,
        //chalk.green("✓")
    );
});