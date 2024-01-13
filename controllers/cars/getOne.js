const Car = require("../../models/Car");

const { requestError } = require("../../helpers");

const getOne = async (req, res) => {
  const { carId } = req.params;
  const car = await Car.findById(carId);
  if (!car) {
    throw requestError(404, "Car not found");
  }

  res.status(200).json(car);
};

module.exports = getOne;
