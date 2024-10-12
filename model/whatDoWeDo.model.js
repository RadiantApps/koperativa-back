const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const createWhatDoWeDo = async (title, description) => {
  const result = await executeQuery({
    query: getSQLQuery([2006]),
    params: [title, description],
  });
  if (!result?.status) throw result;
  return result;
};

const getWhatWeDo = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1010]),
  });
  if (!result?.status) throw result;
  return result?.data;
};

const deleteWhatWeDo = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4002]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data;
};
module.exports = {
  createWhatDoWeDo,
  getWhatWeDo,
  deleteWhatWeDo,
};
