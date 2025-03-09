const TeamsModel = require("../model/teams.model");
const { validationTeams } = require("../validation/teams/teams");

exports.getTeams = async (req, res) => {
  try {
    const result = await TeamsModel.getTeams();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

exports.createTeams = async (req, res) => {
  const { name, surname, title, subtitle } = req.body;
  const photo = req.file.path;

  const { errors, isValid } = validationTeams(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createResponse = await TeamsModel.createTeams(
      name,
      surname,
      title,
      subtitle,
      photo
    );
    res.status(201).json({
      success: true,
      message: "Teams created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating teams", error });
  }
};

exports.updateOrder = async (req, res) => {
  const { items } = req.body;

  const itemsArr = JSON.parse(items);
  try {
    const promises = itemsArr.map((item) =>
      TeamsModel.updateTeamsOrder(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Teams items updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating Teams order", error });
  }
};
exports.updateTeams = async (req, res) => {
  const { name, surname, title, subtitle } = req.body;
  const photo = req.file ? req.file.path : null;
  const { id } = req.params;

  try {
    const createResponse = await TeamsModel.updateTeams(
      name,
      surname,
      title,
      subtitle,
      photo,
      id
    );
    res.status(201).json({
      success: true,
      message: "Teams updated successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating teams", error });
  }
};
exports.deleteTeams = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTeams = await TeamsModel.deleteTeams(id);
    res.json({
      success: true,
      message: "Teams deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing teams", error });
  }
};
