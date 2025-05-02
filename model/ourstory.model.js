const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getOurStory = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1034]),
  });
  if (!result?.status) throw result;
  return result?.data;
};

const createOurStory = async (type, data, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2025]),
    params: [type, data, order],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const deleteOurStory = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4022]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const updatetOrderItem = async (id, order) => {
  const result = await executeQuery({
    query: getSQLQuery([3017]),
    params: [order, id],
  });
  if (!result.status) throw result;
  return result;
};

module.exports = {
  getOurStory,
  createOurStory,
  deleteOurStory,
  updatetOrderItem,
};
