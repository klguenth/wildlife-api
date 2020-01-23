require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DB_URL,
  "validateChecksums": false, // Set to false to skip validation
}