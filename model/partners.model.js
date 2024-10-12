const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const createPartner = async (title, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2007]),
    params: [title, photo],
  });
  if (!result.status) throw result;
  return result;
};

const getPartners = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1011]),
  });
  if (!result.status) throw result;
  return result?.data;
};

const deletePartners = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4003]),
    params: [id],
  });
  if (!result.status) throw result;
  return result?.data;
};

module.exports = { createPartner, getPartners, deletePartners };
