/**
 * @fileoverview Routes for handling location-related requests.
 * 
 * @requires express
 * @requires ../controllers/locationController
 */
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
  * Route serving a list of locations.
  * @name get/locations
  * @function
  * @memberof module:locationRouter
  * @inner
  * @param {string} path - Express path
  * @param {callback} middleware - Express middleware
  */
router.get('/locations', locationController.getLocations);

/**
 * Route for adding a new location.
 * @name post/locations
 * @function
 * @memberof module:locationRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/locations', locationController.addLocation);

/**
 * Route for deleting a location by ID.
 * @name delete/locations/:id
 * @function
 * @memberof module:locationRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;
