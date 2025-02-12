const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getPortfolioMapCategoryByPortfolioId = async (portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([1031]),
    params: [portfolioId],
  });

  if (!result?.status) throw result;
  return result?.data;
};

const createPortfolioMapCategory = async (portfolioId, categoryId) => {
  const result = await executeQuery({
    query: getSQLQuery([2023]),
    params: [portfolioId, categoryId],
  });
  if (!result?.status) throw result;
  return result;
};

const deletePortfolioMapCategory = async (id, portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([4019]),
    params: [id, portfolioId],
  });
  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getPortfolioMapCategoryByPortfolioId,
  createPortfolioMapCategory,
  deletePortfolioMapCategory,
};
