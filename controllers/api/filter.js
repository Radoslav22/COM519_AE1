const BMW = require("../../models/bmw");

const bodyParser = require("body-parser");

exports.ascending = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;

//maker_key:1,model_key: 1, mileage:1, engine_power:1,registration_date:1,fuel:1,paint_color:1,car_type:1,price:1,sold_at:1
    try {
        const BMWS = await BMW.find({}).sort({maker_key:1,model_key: 1, mileage:1, engine_power:1,registration_date:1,fuel:1,paint_color:1,car_type:1,price:1,sold_at:1}).skip((perPage * page) - perPage).limit(limit);
        const count = await BMW.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);

        res.render("listing-ascending", {
            BMWS: BMWS,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
    } catch (e) {
        res.status(404).send({ message: "could not list records" });
    }
};

exports.descending = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;

//maker_key:1,model_key: 1, mileage:1, engine_power:1,registration_date:1,fuel:1,paint_color:1,car_type:1,price:1,sold_at:1
    try {
        const BMWS = await BMW.find({}).sort({maker_key:-1,model_key: -1, mileage:-1, engine_power:-1,registration_date:-1,fuel:-1,paint_color:-1,car_type:-1,price:-1,sold_at:-1}).skip((perPage * page) - perPage).limit(limit);
        const count = await BMW.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);

        res.render("listing-descending", {
            BMWS: BMWS,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
    } catch (e) {
        res.status(404).send({ message: "could not list records" });
    }
};
