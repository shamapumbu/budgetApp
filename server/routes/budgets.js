const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/auth');

router.get('/', auth, budgetController.getBudgets);
router.post('/', auth, budgetController.createBudget);
router.get('/:id', auth, budgetController.getBudgetById);
router.put('/:id', auth, budgetController.updateBudget);
router.delete('/:id', auth, budgetController.deleteBudget);

module.exports = router;
