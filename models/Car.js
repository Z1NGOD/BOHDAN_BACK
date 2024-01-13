const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    id: Number,
    year: Number,
    make: String,
    model: String,
    type: String,
    img: String,
    description: String,
    fuelConsumption: String,
    engineSize: String,
    accessories: Array,
    functionalities: Array,
    rentalPrice: Number,
    RentalCompany: String,
    address: String,
    rentalConditions: String,
    mileage: Number,
  },
  { versionKey: false, timestamps: true }
);

const Car = model("car", carSchema);

module.exports = Car;
