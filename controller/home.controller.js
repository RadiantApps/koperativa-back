const HomePage = require("../model/homepage.model");
exports.createContents = async (req, res) => {
  const { type, description } = req.body;

  try {
    const createResponse = await HomePage.createContent(type, description);
    res.status(201).json({
      success: true,
      message: `Conente ${type} created successfull`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating ", error });
  }
};

exports.getContent = async (req, res) => {
  try {
    const response = await HomePage.getContent();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error gettting home page", error });
  }
};

exports.editContent = async (req, res) => {
  const { id, content } = req.body;
  try {
    const updateResponse = await HomePage.editContent(id, content);
    res.json({
      success: true,
      message: "Update content successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error editing home page", error });
  }
};

exports.getBannerHome = async (req, res) => {
  try {
    const result = await HomePage.getBannerHome();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting banner", error });
  }
};

exports.createBannerHome = async (req, res) => {
  const photo = req.file.key;
  try {
    const response = await HomePage.createBannerHome(photo);
    return res.status(201).json({ message: "Banner Home created succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating banner ", error });
  }
};

exports.deleteBannerHome = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await HomePage.deleteBannerHome(id);
    return res.status(201).json({ message: "Banner deleted succesfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleteing banner home", error });
  }
};
