const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Route for creating a new transaction
router.post('/', transactionController.createTransaction);

// Route for updating transaction status
router.patch('/update-status', transactionController.updateTransactionStatus);

module.exports = router;