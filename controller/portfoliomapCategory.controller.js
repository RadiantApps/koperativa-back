const PortfolioMapCategory = require("../model/portfoliomapCategory.model");

exports.getPortfolioMapCategoryByPortfolioId = async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await PortfolioMapCategory.getPortfolioMapCategoryByPortfolioId(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "can't get errpr", error });
  }
};

exports.createPortfolioMapCategory = async (req, res) => {
  const { portfolioId, categoryId } = req.body;
  try {
    const result = await PortfolioMapCategory.createPortfolioMapCategory(
      portfolioId,
      categoryId
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "can't get errpr", error });
  }
};

exports.deletePortfolioMapCategory = async (req, res) => {
  const { id, portfolioId } = req.params;
  try {
    const result = await PortfolioMapCategory.deletePortfolioMapCategory(
      id,
      portfolioId
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "can't get errpr", error });
  }
};
