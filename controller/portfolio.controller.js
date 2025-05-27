const portfolioModel = require("../model/portfolio.model");
exports.getPortfolios = async (req, res) => {
  const { id } = req.query;
  try {
    const portfolios = await portfolioModel.getAllPortfolios(id);
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolios", error });
  }
};

exports.getPortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await portfolioModel.getPortfolioById(id);
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

exports.getPortfolioDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await portfolioModel.getPortfolioDetails(id);
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

exports.createPortfolio = async (req, res) => {
  const { title } = req.body;
  const photo = req.file.key;
  try {
    const createPortfolio = await portfolioModel.createPortfolio(title, photo);
    return res.status(201).json({ message: "Portfolio added succesfull" });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
  }
};

exports.updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const photo = req.file && req.file.key;
  try {
    const update = await portfolioModel.updatePortfolio(id, title, photo);
    return res.status(201).json({ message: "Portfolio updated successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating portfolio", error });
  }
};

exports.deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await portfolioModel.deleteProtfolioById(id);
    if (deleted) {
      return res.status(200).json({ message: "Portfolio delete successufull" });
    } else {
      return res.status(404).json({ message: "Portfolio not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error deleting Portfolio", error });
  }
};

exports.updateOrder = async (req, res) => {
  const { items } = req.body;

  const itemsArr = JSON.parse(items);
  try {
    const promises = itemsArr.map((item) =>
      portfolioModel.updatePortfolioOrder(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Portfoli items updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updaing order", error });
  }
};
