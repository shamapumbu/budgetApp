const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.get('/', auth, transactionController.getTransactions);
router.post('/', auth, transactionController.createTransaction);
router.get('/:id', auth, transactionController.getTransactionById);
router.put('/:id', auth, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;
