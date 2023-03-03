const Budget = require('../models/BudgetModel');

exports.createBudget = async (req, res) => {
  try {
    const { name, description, totalIncome, totalExpenses } = req.body;
    console.log(req.body)
    const newBudget = new Budget({
      name,
      user: req.user,
      description,
      totalIncome,
      totalExpenses,
    });

    await newBudget.save();

    res.status(201).json(newBudget);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets =     await Budget.find({ user: req.user }).populate('categories').exec((err, budgets) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(200).json(budgets);
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  exports.getBudgetById = async (req, res) => {
    try {
      const budget = await Budget.findById(req.params.id).populate('categories').exec();
  
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      if (!budget.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      res.status(200).json(budget);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  exports.updateBudget = async (req, res) => {
    try {
      const { name, description, totalIncome, totalExpenses } = req.body;
  
      const budget = await Budget.findById(req.params.id);
  
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      if (!budget.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      budget.name = name;
      budget.description = description;
      budget.totalIncome = totalIncome;
      budget.totalExpenses = totalExpenses;
  
      await budget.save();
  
      res.status(200).json(budget);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  exports.deleteBudget = async (req, res) => {
    try {
      const budget = await Budget.findById(req.params.id);
  
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }
  
      if (!budget.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      await budget.delete();
  
      res.status(200).json({ message: "Budget deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
