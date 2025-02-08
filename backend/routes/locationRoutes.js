const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/locations', locationController.getLocations);
router.post('/locations', locationController.addLocation);
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;
