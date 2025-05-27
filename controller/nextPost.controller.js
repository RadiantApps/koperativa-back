const NextPostModel = require("../model/nextPost.model");

exports.getNextPostByPortfolioId = async (req, res) => {
  const { portfolioId } = req.params;

  try {
    const response = await NextPostModel.getNextPostByPortfolioId(portfolioId);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting portfolio deliverabless", error });
  }
};

exports.createNextPost = async (req, res) => {
  const { portfolioId, nextPostId } = req.body;
  try {
    let imageUrl1 = null;
    let imageUrl2 = null;

    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].key : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].key : null;
    }

    const contentData = { imageUrl: [{ imageUrl1 }, { imageUrl2 }] };

    const createResponse = await NextPostModel.createNextPost(
      portfolioId,
      JSON.stringify(contentData),
      nextPostId
    );

    return res.status(201).json({
      message: "Next Post added successfully",
      data: createResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating next post content",
      error: error.message,
    });
  }
};

exports.deleteNextPost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await NextPostModel.deleteNextPost(id);
    return res.json({
      success: true,
      message: "Next post deleted successfull",
    });
  } catch (error) {
    console.error("Error deleting next post:", error);
    return res.status(500).json({
      message: "Error deleteing nextPost",
      error: error.message,
    });
  }
};
