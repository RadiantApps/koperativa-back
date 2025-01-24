const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const createPortfolioItem = async (
  portfolioId,
  description,
  title,
  subtitle,
  photo
) => {
  const result = await executeQuery({
    query: getSQLQuery([2002]),
    params: [portfolioId, description, title, subtitle, photo],
  });
  if (!result.status) throw result;
  return result;
};

const updatePortfolioItem = async (
  portfolioId,
  description,
  title,
  subtitle
) => {
  const result = await executeQuery({
    query: getSQLQuery([3006]),
    params: [description, title, subtitle, portfolioId],
  });
  if (!result.status) throw result;
  return result;
};

const getPortfolioItemById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1007]),
    params: [id],
  });
  if (!result.status) throw result;
  return result.data[0];
};

const createDeliverables = async (portfolioId, name, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2003]),
    params: [portfolioId, name, order],
  });
  if (!result.status) throw result;
  return result;
};

const deleteDeliverables = async (id) => {
  console.log(id);
  const result = await executeQuery({
    query: getSQLQuery([4014]),
    params: [id],
  });
  if (!result.status) throw result;
  return result;
};

const getDeliverableByPortfolioId = async (portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([1005]),
    params: [portfolioId],
  });
  if (!result.status) throw result;
  return result.data;
};

const updateDeliverableOrder = async (id, order) => {
  const result = await executeQuery({
    query: getSQLQuery([3000]),
    params: [order, id],
  });
  if (!result.status) throw result;
  return result;
};

const updateContentOrder = async (id, order) => {
  const result = await executeQuery({
    query: getSQLQuery([3001]),
    params: [order, id],
  });
  if (!result.status) throw result;
  return result;
};

const getContetPortfolioItemById = async (portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([1006]),
    params: [portfolioId],
  });
  if (!result.status) throw result;
  return result.data;
};

const createPortfolioContent = async (portfolioId, type, data, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2004]),
    params: [portfolioId, type, data, order],
  });
  if (!result.status) throw result;
  return result;
};

const updatePortfolioContent = async (type, data, portfolioId) => {
  const result = await executeQuery({
    query: getSQLQuery([3008]),
    params: [type, data, portfolioId],
  });
  if (!result.status) throw result;
  return result;
};

module.exports = {
  createPortfolioItem,
  createDeliverables,
  getDeliverableByPortfolioId,
  updateDeliverableOrder,
  createPortfolioContent,
  getContetPortfolioItemById,
  updateContentOrder,
  getPortfolioItemById,
  updatePortfolioItem,
  deleteDeliverables,
  updatePortfolioContent,
};
