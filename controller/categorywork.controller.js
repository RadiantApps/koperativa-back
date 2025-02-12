const e = require("cors");
const CategoryWorkModel = require("../model/categorywork.model");

exports.getCategoryWorks = async (req, res) => {
  try {
    const response = await CategoryWorkModel.getCategoryWorks();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error gettting category works", error });
  }
};

exports.createCategoryWorks = async (req, res) => {
  const { name } = req.body;
  try {
    const response = await CategoryWorkModel.createCategoryWorks(name);
    res.status(201).json({
      success: true,
      message: `Category work added successfull`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category work", error });
  }
};

exports.deleteCategoryWorks = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CategoryWorkModel.deleteCategoryWorks(id);
    res.json({
      success: true,
      message: "Delete category work successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category work", error });
  }
};
