const { response } = require('express');
const BMW = require ('../../models/bmw');

exports.list = async (req,res) => {
    
    const searchQuery = req.query;
    console.log(searchQuery);
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;

    if (searchQuery){
        console.log("in if")
        try {
            const BMWS = await BMW.find({model_key: searchQuery}).skip((perPage * page) - perPage).limit(limit);
            const count = await BMW.find({}).count();
            const numberOfPages = Math.ceil(count / perPage);
    
            res.render("search", {
                BMWS: BMWS,
                numberOfPages: numberOfPages,
                currentPage: page,
                message: message
            });
        } catch (e) {
            res.status(404).send({ message: "could not list records" });
        }
    }else{

    }
    
};
