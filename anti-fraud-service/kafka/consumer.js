const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'anti-fraud-service', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'anti-fraud-group' });
const axios = require('axios');

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transaction-validation', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transaction = JSON.parse(message.value.toString());
      const status = transaction.amount > 1000 ? 'rejected' : 'approved';
      
      await updateTransactionStatus({ id: transaction.id, status });
    },
  });
};

const updateTransactionStatus = async(transaction) => {
  try {
    const response = await axios.patch('http://localhost:3000/transactions/update-status', transaction);
    console.log('Transaction status updated:', response.data);
  } catch (error) {
    console.error('Error updating transaction status:', error);
  }
}

module.exports = startConsumer;