const BMW = require("../models/bmw");

const bodyParser = require("body-parser");


exports.list = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;


    try {
        const BMWS = await BMW.find({}).skip((perPage * page) - perPage).limit(limit);
        const count = await BMW.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);

        res.render("listing", {
            BMWS: BMWS,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
    } catch (e) {
        res.status(404).send({ message: "could not list records" });
    }
};

exports.create = async (req, res) => {
    
    
    try {

        await BMW.create({
            maker_key: req.body.maker,
            model_key: req.body.model,
            mileage: req.body.mileage,
            engine_power: req.body.engine,
            registration_date: req.body.registration,
            fuel: req.body.fuel,
            paint_color: req.body.paint,
            car_type: req.body.type,
            price: req.body.price ,
            sold_at: req.body.sold_at 
        });

        
        res.redirect('/listing/?message=BMW record has been created');
        console.log("created and saved record!!!");
    } catch (e) {
        if (e.errors) {
            res.render('create', { errors: e.errors })
            console.log(e.errors);
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}



exports.edit = async (req, res) => {
    const _id = req.params["id"];
    
    try {
      const result = await BMW.findById(_id);
      
      if (!result) throw Error('cant find record');
      res.render('update', {
        result: result,
      });
      console.log(`finded record with id: ${_id}`);
    } catch (e) {
      console.log(e)
      if (e.errors) {
        res.render('listing', { errors: e.errors })
        return;
      }
      res.status(404).send({
        message: `could find record ${_id}`,
      });
    }
  };

exports.editView = async(req,res)=>{
   
    try{
        await BMW.updateOne({
            maker_key: req.body.maker,
            model_key: req.body.model,
            mileage: req.body.mileage,
            engine_power: req.body.engine,
            registration_date: req.body.registration,
            fuel: req.body.fuel,
            paint_color: req.body.paint,
            car_type: req.body.type,
            price: req.body.price ,
            sold_at: req.body.sold_at 
        });
        console.log("record successfully updated!")
        res.redirect("/listing");
    }catch (e) {
        res.status(404).send({
            message: `could not update  record.`,
        });
    }
};

exports.delete = async (req, res) => {
    const _id = req.params._id;
    
    try {
        await BMW.findByIdAndRemove(_id);
        res.redirect("/listing");
        console.log("Record Deleted");
    } catch (e) {
        res.status(404).send({
            message: `could not delete  record ${_id}.`,
        });
    }
};