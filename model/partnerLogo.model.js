const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getPartnerLogo = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1026]),
  });
  if (!result.status) throw result;
  return result?.data;
};

const createPartnerLogo = async (path) => {
  const result = await executeQuery({
    query: getSQLQuery([2020]),
    params: [path],
  });
  if (!result.status) throw result;
  return result?.data;
};

const deletePartnerLogo = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4016]),
    params: [id],
  });
  if (!result.status) throw result;
  return result?.data;
};

module.exports = {
  getPartnerLogo,
  deletePartnerLogo,
  createPartnerLogo,
};
