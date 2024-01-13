const express = require("express");
const ctrlCar = require("../../controllers/cars");
const wrapper = require("../../helpers/controllerWrapper");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The car's ID
 *         year:
 *           type: number
 *           description: The car's manufacturing year
 *         make:
 *           type: string
 *           description: The car's make
 *         model:
 *           type: string
 *           description: The car's model
 *         type:
 *           type: string
 *           description: The car's type
 *         img:
 *           type: string
 *           description: URL of the car's image
 *         description:
 *           type: string
 *           description: Description of the car
 *         fuelConsumption:
 *           type: string
 *           description: Fuel consumption information
 *         engineSize:
 *           type: string
 *           description: The car's engine size
 *         accessories:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of accessories
 *         functionalities:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of functionalities
 *         rentalPrice:
 *           type: number
 *           description: The car's rental price
 *         RentalCompany:
 *           type: string
 *           description: The rental company
 *         address:
 *           type: string
 *           description: The car's address
 *         rentalConditions:
 *           type: string
 *           description: Rental conditions
 *         mileage:
 *           type: number
 *           description: The car's mileage
 */
/**
 * @swagger
 * /api/cars/getOne/{carId}:
 *   get:
 *     summary: Get a single car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to retrieve
 *     responses:
 *       200:
 *         description: A single car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router.get("/getOne/:carId", wrapper(ctrlCar.getOne));

/**
 * @swagger
 * /api/cars/catalog:
 *   get:
 *     summary: Get all cars by category
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter cars by brand
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: Filter cars by price
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Filter cars by minimum mileage
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         description: Filter cars by maximum mileage
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of cars per page
 *     responses:
 *       200:
 *         description: A list of cars by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                 totalCount:
 *                   type: integer
 *       404:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

router.get("/catalog", wrapper(ctrlCar.listCars));

module.exports = router;
