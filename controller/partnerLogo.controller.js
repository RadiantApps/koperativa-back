const PartnerLogoModel = require("../model/partnerLogo.model");

exports.getPartnerLogo = async (req, res) => {
  try {
    const response = await PartnerLogoModel.getPartnerLogo();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting partner logo", error });
  }
};

exports.createPartnerLogo = async (req, res) => {
  const photo = req.file.key;
  try {
    const response = await PartnerLogoModel.createPartnerLogo(photo);
    return res.status(201).json({ message: "Logo u shtua me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating partner logo", error });
  }
};

exports.deletePartnerLogo = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await PartnerLogoModel.deletePartnerLogo(id);
    return res.status(201).json({ message: "Logo u  fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting partner logo", error });
  }
};
