/**
 * @file locationController.js
 * @description Controller for managing locations in the weather application.
 */

const db = require('../db');

/**
 * Get stored locations get sorted location based on time.
 * 
 * @function getLocations
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.getLocations = (req, res) => {
  db.all("SELECT id, name, country_code, created_at FROM locations ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

/**
 * Add a new location need user tp provide name and country code.
 * 
 * @function addLocation
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.addLocation = (req, res) => {
  const { name, country_code } = req.body;

  if (!name || !country_code) {
    return res.status(400).json({ error: "All fields (name) are required" });
  }

  const query = `
    INSERT INTO locations (name, country_code) 
    VALUES (?, ?)
    ON CONFLICT(name) DO UPDATE SET created_at = CURRENT_TIMESTAMP
    `;

  db.run(query, [name, country_code], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name });
  });
};

/**
 * Delete a location need user to provide id.
 * 
 * @function deleteLocation
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.deleteLocation = (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM locations WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: `Location with id ${id} not found` });
    }
    res.json({ id });
  });
};