const Category = require('../models/CategoryModel');
const Budget = require('../models/BudgetModel');

exports.createCategory = async (req, res) => {
  try {
    const { name, description, budgetId } = req.body;

    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    if (!budget.user.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newCategory = new Category({
      name,
      description,
      budget: budgetId,
    });

    await newCategory.save();

    budget.categories.push(newCategory._id);
    await budget.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getCategoriesByBudgetId = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    const categories = await Category.find({ budget: budget._id });
    if (!categories) {
        return res.status(404).json({ message: "Categories not found" });
      }
      
      if (!budget.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
        }
        };
        
        exports.getCategoryById = async (req, res) => {
        try {
        const category = await Category.findById(req.params.id).populate('budget').exec();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
          }
          
          if (!category.budget.user.equals(req.user._id)) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          
          res.status(200).json(category);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
            }
            };
            
            exports.updateCategory = async (req, res) => {
            try {
            const { name, description } = req.body;
            const category = await Category.findById(req.params.id).populate('budget').exec();

if (!category) {
  return res.status(404).json({ message: "Category not found" });
}

if (!category.budget.user.equals(req.user._id)) {
  return res.status(401).json({ message: "Unauthorized" });
}

category.name = name;
category.description = description;

await category.save();

res.status(200).json(category);

} catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
    }
    };
    
    exports.deleteCategory = async (req, res) => {
    try {
    const category = await Category.findById(req.params.id).populate('budget').exec();
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      if (!category.budget.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      await category.delete();
      
      const index = category.budget.categories.indexOf(category._id);
      if (index > -1) {
        category.budget.categories.splice(index, 1);
        await category.budget.save();
      }
      
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
        }
        };      
