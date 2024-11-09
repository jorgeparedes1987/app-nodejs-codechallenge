const { Sequelize } = require('sequelize');
const config = require('../config/config');

// Setup PostgreSQL database connection (adjust with your actual DB connection details)
const sequelize = new Sequelize(config.database,config.username,config.password,{
  dialect: 'postgres',
  host: config.host, // Use 'localhost' if you're running the DB locally
  port: config.port,        // Adjust the port if needed (e.g., 5433 for Docker)
});

module.exports = sequelize;