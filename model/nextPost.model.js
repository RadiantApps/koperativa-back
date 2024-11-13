const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getNextPostByPortfolioId = async (portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([1025]),
    params: [portfolioId],
  });
  if (!result.data) throw result;
  return result?.data;
};

const createNextPost = async (portfolioId, contentData, nextPostId) => {
  const result = await executeQuery({
    query: getSQLQuery([2019]),
    params: [portfolioId, contentData, nextPostId],
  });
  if (!result?.status) throw result;
  return result?.data[0];
};

const deleteNextPost = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4015]),
    params: [id],
  });

  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getNextPostByPortfolioId,
  createNextPost,
  deleteNextPost,
};
