const BannerModel = require("../model/banner.model");

exports.getBanner = async (req, res) => {
  const { type } = req.params;
  try {
    const response = await BannerModel.getBanner(type);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error gettting banner", error });
  }
};

exports.createCareerSlider = async (req, res) => {
  const photo = req.file.key;

  try {
    const response = await BannerModel.createCareerSlider(photo);
    res.status(201).json({
      success: true,
      message: "Slider created successull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating slider", error });
  }
};

exports.getCareerSlider = async (req, res) => {
  try {
    const response = await BannerModel.getCareerSlider();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting slider", error });
  }
};

exports.deleteCareerSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BannerModel.deleteCareerSlider(id);
    res.status(201).json({
      success: true,
      message: "Slider deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting slider", error });
  }
};
