const portfolioItemModel = require("../model/portfolioItem.model");
const { validationDeliverables } = require("../validation/portfolio/portfolio");
exports.getPortfolioItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await portfolioItemModel.getPortfolioItemById(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error getting portfolio item", error });
  }
};

exports.createPortfolioItem = async (req, res) => {
  const { portfolioId, description, title, subtitle } = req.body;
  const photo = req.file.path;
  try {
    const createPortfolioItem = await portfolioItemModel.createPortfolioItem(
      portfolioId,
      description,
      title,
      subtitle,
      photo
    );
    return res.status(201).json({ message: "Portfolio Item added succesfull" });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio item", error });
  }
};

exports.updatePortfolioContent = async (req, res) => {
  const { portfolioId, description, title, subtitle } = req.body;
  const photo = req.file.path;

  try {
    const response = await portfolioItemModel.updatePortfolioItem(
      portfolioId,
      description,
      title,
      subtitle,
      photo
    );
    return res.status(201).json({ message: "Portfolio updated successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating portfolio item", error });
  }
};

exports.createDeliverables = async (req, res) => {
  const { portfolioId, name } = req.body;

  const { errors, isValid } = validationDeliverables(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const existingDeliverables =
    await portfolioItemModel.getDeliverableByPortfolioId(portfolioId);

  const existingOrders = existingDeliverables.map((item) => item.order);
  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
  try {
    const createDeliverables = await portfolioItemModel.createDeliverables(
      portfolioId,
      name,
      nextOrder
    );

    return res.status(201).json({
      message: "Deliverable item added successfully",
      data: createDeliverables,
    });
  } catch (error) {
    console.error("Error creating deliverable item:", error);

    return res.status(500).json({
      message: "Error creating deliverable item",
      error: error.message,
    });
  }
};

exports.deleteDeliverables = async (req, res) => {
  const { id } = req.params;
  try {
    const responseDelete = await portfolioItemModel.deleteDeliverables(id);
    res.json({
      success: true,
      message: "Deliverables deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting deliverables", error });
  }
};

exports.getDeliverableByPortfolioId = async (req, res) => {
  const { portfolioId } = req.params;
  try {
    const responseDeliverables =
      await portfolioItemModel.getDeliverableByPortfolioId(portfolioId);
    res.status(200).json(responseDeliverables);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting portfolio deliverabless", error });
  }
};
exports.deliverablesUpdateOrder = async (req, res) => {
  const { items } = req.body;
  const itemsArr = JSON.parse(items);
  try {
    // Update each item in the database
    const promises = itemsArr.map((item) =>
      portfolioItemModel.updateDeliverableOrder(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Deliverable items updated successfully",
    });
  } catch (error) {
    console.error("Error updating deliverable items:", error);
    return res.status(500).json({
      message: "Error updating deliverable items",
      error: error.message,
    });
  }
};

exports.updatePortfolioContentOrder = async (req, res) => {
  const { items } = req.body;
  const itemsArr = JSON.parse(items);
  try {
    // Update each item in the database
    const promises = itemsArr.map((item) =>
      portfolioItemModel.updateContentOrder(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Content items updated successfully",
    });
  } catch (error) {
    console.error("Error updating content items:", error);
    return res.status(500).json({
      message: "Error updating content items",
      error: error.message,
    });
  }
};

exports.createPortfolioContent = async (req, res) => {
  try {
    let imageUrl1 = null;
    let imageUrl2 = null;
    const fullImageIframeLink = req.body.iframeLink;
    // Handle file uploads
    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].path : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].path : null;
    }
    const { type, content } = req.body;
    const portfolioId = req.params.id;
    const firstLink = req.body.firstIframeLink;
    const secondLink = req.body.secondIframeLink;
    const existingDeliverables =
      await portfolioItemModel.getContetPortfolioItemById(portfolioId);
    const existingOrders = existingDeliverables.map((item) => item.order);
    const nextOrder =
      existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

    let contentData;
    if (type === "image") {
      contentData = {
        imageUrl: fullImageIframeLink ? { fullImageIframeLink } : imageUrl1,
      };
    } else if (type === "text") {
      contentData = { text: content };
    } else if (type === "twoImages") {
      contentData = {
        imageUrls: [
          firstLink ? { firstLink } : imageUrl1,
          secondLink ? { secondLink } : imageUrl2,
        ],
      };
    }

    const createResponse = await portfolioItemModel.createPortfolioContent(
      portfolioId,
      type,
      JSON.stringify(contentData),
      nextOrder
    );

    // Respond with success
    return res.status(201).json({
      message: "Content item added successfully",
      data: createResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating portfolio content",
      error: error.message,
    });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    let imageUrl1 = null;
    let imageUrl2 = null;
    const fullImageIframeLink = req.body.iframeLink;
    // Handle file uploads
    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].path : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].path : null;
    }
    const { type, content } = req.body;
    const portfolioId = req.params.id;
    const firstLink = req.body.firstIframeLink;
    const secondLink = req.body.secondIframeLink;

    let contentData;
    if (type === "image") {
      contentData = {
        imageUrl: fullImageIframeLink ? { fullImageIframeLink } : imageUrl1,
      };
    } else if (type === "text") {
      contentData = { text: content };
    } else if (type === "twoImages") {
      contentData = {
        imageUrls: [
          firstLink ? { firstLink } : imageUrl1,
          secondLink ? { secondLink } : imageUrl2,
        ],
      };
    }
    const createResponse = await portfolioItemModel.updatePortfolioContent(
      type,
      JSON.stringify(contentData),
      portfolioId
    );

    // Respond with success
    return res.status(201).json({
      message: "Content item updated successfully",
      data: createResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating portfolio item", error });
  }
};
exports.getPortfolioContentByPortfilioId = async (req, res) => {
  const { id } = req.params;
  try {
    const responseContent = await portfolioItemModel.getContetPortfolioItemById(
      id
    );
    res.status(200).json(responseContent);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating portfolio content", error });
  }
};
