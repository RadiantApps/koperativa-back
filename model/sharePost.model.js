const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");
const getShareProduct = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1028]),
    params: [id],
  });
  if (!result.status) throw result;
  return result.data[0];
};
module.exports = { getShareProduct };
