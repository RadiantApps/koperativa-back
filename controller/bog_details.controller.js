const BlogDetailsModel = require("../model/blog_details.model.js");

exports.getBlogDetailsContent = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BlogDetailsModel.getBlogDetailsContent(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting blog details", error });
  }
};

exports.createBlogDetailsContent = async (req, res) => {
  try {
    let imageUrl1 = null;
    let imageUrl2 = null;
    const fullImageIframeLink = req.body.iframeLink;
    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].path : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].path : null;
    }
    const { type, content } = req.body;
    const portfolioId = req.params.id;
    const firstLink = req.body.firstIframeLink;
    const secondLink = req.body.secondIframeLink;
    const existingDeliverables = await BlogDetailsModel.getBlogDetailsContent(
      portfolioId
    );
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

    const createResponse = await BlogDetailsModel.createBlogDetails(
      portfolioId,
      type,
      JSON.stringify(contentData),
      nextOrder
    );
    return res.status(201).json({
      message: "Blog item added successfully",
      data: createResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating portfolio content", error });
  }
};

exports.deleteBlogDetailsContent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BlogDetailsModel.deleteBlogDetails(id);
    return res
      .status(200)
      .json({ message: "Blog details deleted successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting blog details", error });
  }
};

exports.updateBlogDetailsContent = async (req, res) => {
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
    const blogId = req.params.id;
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
    const createResponse = await BlogDetailsModel.updateBlogDetails(
      type,
      JSON.stringify(contentData),
      blogId
    );

    // Respond with success
    return res.status(201).json({
      message: "Blog item updated successfully",
      data: createResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating blog details", error });
  }
};
