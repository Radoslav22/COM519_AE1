const { PORT, MONGODB_URI } = process.env;
const { response } = require("express");
const { MongoClient } = require("mongodb");
const uri = MONGODB_URI;
const client = new MongoClient(uri);


exports.list = async (req,res) => {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = MONGODB_URI


    const client = new MongoClient(uri);

    try {
         //Connect to the MongoDB cluster
        await client.connect();

        //Make the appropriate DB calls
        
        await findOneListingByName(client, "BMW");
        

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function findOneListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("COM519").collection("bmw_pricing_challenge").findOne({ maker_key: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        response.render(result);
        
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

