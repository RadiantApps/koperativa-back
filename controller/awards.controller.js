const AwardModel = require("../model/award.model");
const { validationAwards } = require("../validation/awards/awards");

exports.getAwards = async (req, res) => {
  try {
    const response = await AwardModel.getAwards();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching awards", error });
  }
};

exports.creteAwards = async (req, res) => {
  const { organization, project, award, year } = req.body;
  const { errors, isValid } = validationAwards(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createAwardResponse = await AwardModel.createAwards(
      organization,
      project,
      award,
      year
    );
    res.status(201).json({
      success: true,
      message: "Award created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating awards", error });
  }
};

exports.updateAward = async (req, res) => {
  try {
    const { organization, project, award, year } = req.body;
    const { id } = req.params;
    const updateAwardResponse = await AwardModel.updateAward(
      organization,
      project,
      award,
      year,
      id
    );
    res.status(201).json({
      success: true,
      message: "Award updated successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updated award", error });
  }
};

exports.deleteAwards = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAwards = await AwardModel.deleteAwards(id);
    res.json({
      success: true,
      message: "Awards deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing awards", error });
  }
};
