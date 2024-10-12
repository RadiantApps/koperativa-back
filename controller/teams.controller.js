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
