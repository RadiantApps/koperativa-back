const { response } = require("express");
const OurStoryModel = require("../model/ourstory.model");

exports.getOurStory = async (req, res) => {
  try {
    const response = await OurStoryModel.getOurStory();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error getting ourstory", error });
  }
};

exports.createOurStory = async (req, res) => {
  try {
    let imageUrl1 = null;
    let imageUrl2 = null;
    const fullImageIframeLink = req.body.iframeLink;

    if (req.files) {
      imageUrl1 = req.files.file ? req.files.file[0].path : null;
      imageUrl2 = req.files.secondFile ? req.files.secondFile[0].path : null;
    }
    const { type, content } = req.body;
    const firstLink = req.body.firstIframeLink;
    const secondLink = req.body.secondIframeLink;
    const existingOurStory = await OurStoryModel.getOurStory();
    const existingOrders = existingOurStory.map((item) => item.order);
    const nextOrder =
      existingOurStory.length > 0 ? Math.max(...existingOrders) + 1 : 1;

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

    const createResponse = await OurStoryModel.createOurStory(
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
    console.log(error);
    res.status(500).json({ message: "Error creating ourstory", error });
  }
};

exports.deleteOurStory = async (req, res) => {
  const { id } = req.params;
  try {
    const responseContent = await OurStoryModel.deleteOurStory(id);
    res.status(200).json(responseContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting ourstory", error });
  }
};

exports.updateOrder = async (req, res) => {
  const { items } = req.body;
  const itemsArr = JSON.parse(items);

  try {
    const promises = itemsArr.map((item) =>
      OurStoryModel.updatetOrderItem(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Content items updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating order", error });
  }
};
