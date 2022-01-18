const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const BMW = require("./models/bmw");
const { MONGODB_URI, MONGODB_PRODUCTION_URI } = process.env;


const client = new MongoClient(
    process.env.NODE_ENV === "production" ? MONGODB_PRODUCTION_URI : MONGODB_URI
);


async function main() {
    try {
        
        const results = await BMW.find({}).count();
        
        
        /**
         * If existing records then delete the current collections
         */
        if (results) {
            db.dropDatabase();
        }

        /**
         * This is just a fun little loader module that displays a spinner
         * to the command line
         */
        const load = loading("importing pricing list !!").start();

        /**
         * Import the JSON data into the database
         */

        const data = await fs.readFile(path.join(__dirname, "pricing.json"), "utf8");
        await BMW.insertMany(JSON.parse(data));
        
        load.stop();
        console.info(
            `Pricing collection set up!`
        );

        process.exit();
    } catch (error) {
        console.error("error:", error);
        process.exit();
    }
}

main();