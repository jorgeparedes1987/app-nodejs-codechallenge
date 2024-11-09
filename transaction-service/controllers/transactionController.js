const sequelize = require('../database/database'); 
const Transaction = require('../models/transaction')(sequelize);
const sendMessage = require('../kafka/producer');

exports.createTransaction = async (req, res) => {
  try {
    const { amount } = req.body;
    const transaction = await Transaction.create({ amount });

    // Send to anti-fraud validation
    await sendMessage({ id: transaction.id, amount });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const transaction = await Transaction.findByPk(id);

    if (transaction) {
      transaction.status = status;
      await transaction.save();
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};