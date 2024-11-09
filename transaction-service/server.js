require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const config = require('./config/config');

app.use(express.json());
app.use('/transactions', transactionRoutes);

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: 5433
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to database', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Transaction service running on port ${PORT}`));
