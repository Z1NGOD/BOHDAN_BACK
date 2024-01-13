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
 *         title:
 *           type: string
 *           description: The car's title
 *         category:
 *           type: string
 *           description: The car's category
 *         name:
 *           type: string
 *           description: The car's name
 *         date:
 *           type: string
 *           description: The car's date
 *         type:
 *           type: string
 *           description: The car's type
 *         sex:
 *           type: string
 *           description: The car's sex
 *         location:
 *           type: string
 *           description: The car's location
 *         price:
 *           type: string
 *           description: The car's price
 *         comments:
 *           type: string
 *           description: Comments about the car
 *         avatarURL:
 *           type: string
 *           description: URL of the car's avatar
 *         owner:
 *           type: string
 *           description: Owner's ID
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
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of cars to retrieve (sell, in-good-hands, lost-found)
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filter cars by a search query
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *         description: Filter cars by age
 *       - in: query
 *         name: sex
 *         schema:
 *           type: string
 *         description: Filter cars by sex
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
