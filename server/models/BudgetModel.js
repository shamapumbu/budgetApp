const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  budgetAmount: {
    type: Number,
    required: false
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  expenses: [{
    name: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Budget = mongoose.model('budgets', BudgetSchema);
