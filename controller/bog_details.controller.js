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

    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].path : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].path : null;
    }

    const { type, content } = req.body;
    const blogId = req.params.id;

    const existingBlog = await BlogDetailsModel.getBlogDetailsContent(blogId);

    const existingOrders = existingBlog.map((item) => item.order);
    const nextOrder =
      existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

    let contentData;
    if (type === "image") {
      const imageUrl = imageUrl1;
      contentData = { imageUrl };
    } else if (type === "text") {
      contentData = { text: content };
    } else if (type === "twoImages") {
      contentData = { imageUrls: [imageUrl1, imageUrl2] };
    }

    const createResponse = await BlogDetailsModel.createBlogDetails(
      blogId,
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
