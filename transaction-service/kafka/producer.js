const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'transaction-service', brokers: ['localhost:9092'] });

const producer = kafka.producer();

const sendMessage = async (message) => {
  await producer.connect();
  await producer.send({
    topic: 'transaction-validation',
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};

module.exports = sendMessage;