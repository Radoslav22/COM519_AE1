require("dotenv").config();
const path = require("path");
const express = require('express');
const expressSession = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const { PORT, MONGODB_URI } = process.env;
const {MongoClient} = require ("mongodb");


const pricingController = require("./controllers/pricing");









async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = MONGODB_URI


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      //await createListing(client,)
      await findOneListingByName(client,"BMW");

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}



main().catch(console.error);
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};




async function findOneListingByName(client, nameOfListing) {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
  const result = await client.db("COM519").collection("bmw_pricing_challenge").findMany({ maker_key: nameOfListing });
  
  if (result) {
      console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
      console.log(result);
  } else {
      console.log(`No listings found with the name '${nameOfListing}'`);
  }
}










app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

app.set("view engine", "ejs")

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});


app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/pricing", pricingController.list);

app.listen(PORT, () => {
    console.log(
        `Example app listening at http://localhost:${PORT}`,
        //chalk.green("✓")
    );
});