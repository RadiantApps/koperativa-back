const PartnersModel = require("../model/partners.model");

exports.createPartners = async (req, res) => {
  const { title } = req.body;
  const photo = req.file.key;
  try {
    const createPartners = await PartnersModel.createPartner(title, photo);
    return res.status(201).json({ message: "Partner added succesfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating partners", error });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const response = await PartnersModel.getPartners();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting partners", error });
  }
};

exports.deletePartners = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await PartnersModel.deletePartners(id);
    res.json(deleteResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing partners", error });
  }
};
