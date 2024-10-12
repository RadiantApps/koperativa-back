const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getComment = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1012]),
  });

  if (!result?.status) throw result;
  return result.data;
};

const createComment = async (name, title, comment, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2008]),
    params: [name, title, comment, photo],
  });

  if (!result?.status) throw result;
  return result;
};

const deleteComment = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4004]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};
module.exports = {
  getComment,
  createComment,
  deleteComment,
};
