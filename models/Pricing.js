const mongoose = require("mongoose");
const { Schema } = mongoose;

const BMWSchema = new Schema(
  {
    maker_key: String,
    model_key: String,
    mileage: Number,
    engine_power: String,
    registration_date: String,
    fuel: String,
    paint_color: Number,
    car_type: String,
    price: String,
    sold_at: String,
  },
    
  { timestamps: true }
);

module.exports = mongoose.model("bmw", BMWSchema);