/**
 * @fileoverview This module sets up and configures the SQLite3 database connection
 * for the weather application mockup backend.
 * 
 * @requires sqlite3 - The SQLite3 library for interacting with SQLite databases.
 */
const sqlite3 = require('sqlite3').verbose();
const path = process.env.DATABASE_PATH || './weather.db';

/**
 * The path to the SQLite database file. Defaults to './weather.db' if the
 * DATABASE_PATH environment variable is not set.
 * @type {string}
 */
const db = new sqlite3.Database(path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

/**
 * Creates the 'locations' table if it does not already exist.
 * The table includes the following columns:
 * - id: The primary key, auto-incremented integer.
 * - name: The name of the location, unique and not null.
 * - country_code: The country code of the location, not null.
 * - created_at: The timestamp when the record was created, defaults to the current timestamp.
 */
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      country_code TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

module.exports = db;