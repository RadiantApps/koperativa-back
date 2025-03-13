const JobsModel = require("../model/jobs.model");
const { validationJobs } = require("../validation/jobs/jobs");

exports.getJobs = async (req, res) => {
  try {
    const response = await JobsModel.getJobs();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

exports.getJobsById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await JobsModel.getJobsById(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job", error });
  }
};

exports.createJobs = async (req, res) => {
  const { title, city, job_type, description } = req.body;
  const photo = req.file.path;
  const { errors, isValid } = validationJobs(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createJobsResponse = await JobsModel.createJobs(
      title,
      city,
      job_type,
      description,
      photo
    );
    res.status(201).json({
      success: true,
      message: "Jobs created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating jobs", error });
  }
};

exports.deleteJobs = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await JobsModel.deleteJobs(id);
    res.json({
      success: true,
      message: "Jobs deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing jobs", error });
  }
};
