const sequelize = require('../database/database');  // Import your Sequelize instance
const Transaction = require('../models/Transaction')(sequelize);  // Import your Transaction model

// Sync the models to the database
sequelize.sync({ force: false })  // Set force: true to drop and recreate the table
  .then(() => {
    console.log('Database synced and table created!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });