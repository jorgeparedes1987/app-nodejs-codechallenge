const sequelize = require('../database/database');  
const config = require('../config/config');

(async () => {
  try {
    await sequelize.query(`CREATE DATABASE ${config.database}`);
    console.log('Database created successfully!');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
})();