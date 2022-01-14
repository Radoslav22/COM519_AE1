const Pricing = require("../models/Pricing");

exports.list = async (req, res) => {
    try {
      const pricings = Pricing.find({});
      console.log(pricings);
      res.render("pricing", { pricings: pricings });
      
    } catch (e) {
      res.status(404).send({ message: "could not list prices" });
    }
};

