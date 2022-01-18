const mongoose = require("mongoose");
const { Schema } = mongoose;

const BMWSchema = new Schema(
  {
    maker_key: String,
    model_key: String,
    mileage: String,
    engine_power: String,
    registration_date: String,
    fuel: String,
    paint_color: String,
    car_type: String,
    price: String,
    sold_at: String,
  },
    
  { timestamps: false }
);

module.exports = mongoose.model("bmw_pricing_challenge", BMWSchema);