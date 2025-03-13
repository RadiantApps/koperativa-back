const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getLatestWork = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1033]),
  });
  if (!result.status) throw result;
  return result?.data;
};

const createLatestWork = async (refId, type, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2024]),
    params: [refId, type, order],
  });

  if (!result.status) throw result;
  return result?.data;
};

const deleteLatestWork = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4021]),
    params: [id],
  });

  if (!result.status) throw result;
  return result?.data;
};

const updateLatestWorkOrder = async (id, order) => {
  const result = await executeQuery({
    query: getSQLQuery([3016]),
    params: [order, id],
  });
  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getLatestWork,
  createLatestWork,
  deleteLatestWork,
  updateLatestWorkOrder,
};
