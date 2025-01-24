const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getTeams = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1014]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const createTeams = async (name, surname, title, subtitle, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2010]),
    params: [name, surname, title, subtitle, photo],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteTeams = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4006]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};

const updateTeams = async (name, surname, title, subtitle, photo, id) => {
  const result = await executeQuery({
    query: getSQLQuery([3010]),
    params: [name, surname, title, subtitle, photo, id],
  });
  if (!result?.status) throw result;
  return result;
};
module.exports = {
  getTeams,
  createTeams,
  deleteTeams,
  updateTeams,
};
