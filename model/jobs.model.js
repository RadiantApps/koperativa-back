const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getJobs = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1015]),
  });
  if (!result.data) throw result;
  return result?.data;
};

const getJobsById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1016]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data[0];
};

const createJobs = async (title, city, job_type, description) => {
  const result = await executeQuery({
    query: getSQLQuery([2011]),
    params: [title, city, job_type, description],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteJobs = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4007]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getJobs,
  getJobsById,
  createJobs,
  deleteJobs,
};
