
/**
 * @fileoverview Main server file for the weather application mockup.
 * @requires dotenv - Loads environment variables from a .env file into process.env.
 * @requires express - Fast, unopinionated, minimalist web framework for Node.js.
 * @requires cors - Middleware to enable Cross-Origin Resource Sharing.
 * @requires ./routes/locationRoutes - Routes for handling location-related requests.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const locationRoutes = require('./routes/locationRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware to enable CORS.
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Use location routes for handling requests to /api/v1.
 */
app.use('/api/v1', locationRoutes);

/**
 * Starts the server and listens on the specified port.
 * @param {number} PORT - The port number on which the server listens.
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});