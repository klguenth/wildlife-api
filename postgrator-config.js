require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV 
    ? process.env.TEST_DATABASE_URL
    : process.env.DB_URL
  ),
  "validateChecksums": false, // Set to false to skip validation
}