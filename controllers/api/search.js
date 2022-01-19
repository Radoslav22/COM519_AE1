const { response } = require('express');
const BMW = require ('../../models/bmw');

exports.post = async (req,res) => {
    
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;


    try {
        const BMWS = await BMW.find({model_key: req.body.search}).skip((perPage * page) - perPage).limit(limit);
        const count = await BMW.find({model_key: req.body.search}).count();
        const numberOfPages = Math.ceil(count / perPage);

        //console.log({BMWS:BMWS});
        //console.log({count:count});
       // console.log({numberOfPages:numberOfPages});
        res.render("listing", {
            BMWS: BMWS,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
        
    } catch (e) {
        console.log(e);
        console.log({ message: "could not list records" });
    }
};

exports.get = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;


    try {
        const BMWS = await BMW.find({}).skip((perPage * page) - perPage).limit(limit);
        const count = await BMW.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);

        res.render("search", {
            BMWS: BMWS,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
        
    } catch (e) {
        console.log(e);
        console.log({ message: "could not list records" });
    }
};

