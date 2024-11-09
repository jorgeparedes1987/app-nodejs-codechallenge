const startConsumer = require('./kafka/consumer');

startConsumer()
  .then(() => console.log('Anti-Fraud Service is listening for transactions'))
  .catch(err => console.log('Error starting Anti-Fraud Service:', err));