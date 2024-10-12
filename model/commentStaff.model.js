const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getCommentStaff = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1017]),
  });
  if (!result?.status) throw result;
  return result?.data;
};

const createCommentStaff = async (name, position, comment, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2012]),
    params: [name, position, comment, photo],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteCommentStaff = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4008]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getCommentStaff,
  createCommentStaff,
  deleteCommentStaff,
};
