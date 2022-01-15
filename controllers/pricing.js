const Pricing = require("../models/Pricing");
const {PORT, MONGODB_URI} = process.env;
const {MongoClient} = require("mongodb");
const uri = MONGODB_URI
const client = new MongoClient(uri);
client.connect();

exports.list = async (req, res) => {

  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; 
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;


    try {
      const cursor = client.db("COM519").collection("bmw_pricing_challenge").find({}).skip((perPage * page) - perPage).limit(limit)
      const count = client.db("COM519").collection("bmw_pricing_challenge").find({}).count();
      const numberOfPages = Math.ceil(count / perPage);

      //const cursor = client.db("COM519").collection("bmw_pricing_challenge").find({ maker_key: "BMW" })
      //console.log(pricings);
      //const pricings = Pricing.find({maker_key:"BMW"})
      //const cursor = collection.find({});
      
      const firstResult = await cursor.toArray();
      //console.log(firstResult);
      res.render("pricing",{firstResult: firstResult,
                            numberOfPages: numberOfPages,
                            currentPage: page,
                            message: message});
      //res.send({message:"list prices"})
    } catch (e) {
      res.status(404).send({ message: "could not list prices" });
    }
};

