const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAwards = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1013]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const createAwards = async (organization, project, award, year) => {
  const result = await executeQuery({
    query: getSQLQuery([2009]),
    params: [organization, project, award, year],
  });
  if (!result?.status) throw result;
  return result;
};

const updateAward = async (organization, project, award, year, id) => {
  const result = await executeQuery({
    query: getSQLQuery([3009]),
    params: [organization, project, award, year, id],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteAwards = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4005]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};
module.exports = {
  getAwards,
  createAwards,
  deleteAwards,
  updateAward,
};
