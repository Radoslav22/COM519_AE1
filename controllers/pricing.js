const Pricing = require("../models/Pricing");
const {PORT, MONGODB_URI} = process.env;
const {MongoClient} = require("mongodb");
const uri = MONGODB_URI
const client = new MongoClient(uri);
client.connect();

exports.list = async (req, res) => {
    try {
      const cursor = client.db("COM519").collection("bmw_pricing_challenge").find({ model_key: "420" })
      //console.log(pricings);
      //const pricings = Pricing.find({maker_key:"BMW"})
      //const cursor = collection.find({});
      
      const firstResult = await cursor.toArray();
      console.log(firstResult);
      res.render("pricing",{firstResult: firstResult})
      //res.send({message:"list prices"})
    } catch (e) {
      res.status(404).send({ message: "could not list prices" });
    }
};

