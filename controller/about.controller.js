const AboutModel = require("../model/about.model");
exports.createContents = async (req, res) => {
  const { type, description } = req.body;
  try {
    const response = await AboutModel.createContent(type, description);
    res.status(201).json({
      success: true,
      message: `Content added successfull`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating ", error });
  }
};

exports.getContent = async (req, res) => {
  try {
    const response = await AboutModel.getContent();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error gettting about content page", error });
  }
};

exports.editContent = async (req, res) => {
  const { id, content } = req.body;
  try {
    const response = await AboutModel.editContent(id, content);
    res.json({
      success: true,
      message: "Update Content successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error editing home page", error });
  }
};

exports.createSlider = async (req, res) => {
  const photo = req.file.path;
  try {
    const response = await AboutModel.createSlider(photo);
    res.json({
      success: true,
      message: "Create slider successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error createing slider", error });
  }
};

exports.getSlider = async (req, res) => {
  try {
    const response = await AboutModel.getSlider();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error gettting slider", error });
  }
};

exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await AboutModel.deleteSlider(id);
    res.json({
      success: true,
      message: "Slider deleted successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting slider", error });
  }
};

exports.addPhoto = async (req, res) => {
  const photo = req.file.path;
  const { type } = req.body;
  try {
    const response = await AboutModel.addPhoto(photo, type);
    res.json({
      success: true,
      message: "Create photo successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding photo", error });
  }
};

exports.updatePhoto = async (req, res) => {
  const photo = req.file.path;
  const { id } = req.params;

  try {
    const response = await AboutModel.updatePhoto(id, photo);
    res.json({
      success: true,
      message: "Updated successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating photo", error });
  }
};

exports.deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await AboutModel.deletePhoto(id);
    res.json({
      success: true,
      message: "Photo deleted successfull",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photo", error });
  }
};
