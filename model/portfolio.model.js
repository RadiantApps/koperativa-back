const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");
const fs = require("fs").promises;
const getAllPortfolios = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1003]),
  });

  if (!result?.status) throw result;
  return result.data;
};

const getPortfolioById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1004]),
    params: [id],
  });
  if (!result.status) throw result;
  return result?.data[0];
};

const createPortfolio = async (title, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2001]),
    params: [title, photo],
  });
  if (!result.status) throw result;
  return result;
};

const updatePortfolio = async (id, title, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([3007]),
    params: [title, photo, id],
  });
  if (!result.status) throw result;
  return result;
};

const deleteProtfolioById = async (id) => {
  const data = await getPortfolioById(id);
  if (data) {
    const result = await executeQuery({
      query: getSQLQuery([4001]),
      params: [id],
    });
    if (!result?.data) throw result;
    await fs.unlink(data.photo);
    return result;
  }
};

const getPortfolioDetails = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1008]),
    params: [id],
  });

  if (!result.status) throw result;

  const portfolio = {};
  const portfolioContent = [];
  const portfolioDeliverables = [];

  const contentIds = new Set();
  const deliverableIds = new Set();

  result.data.forEach((row) => {
    if (!portfolio.id) {
      portfolio.id = row.portfolio_id;
      portfolio.title = row.portfolio_title;
      portfolio.photo = row.portfolio_photo;
      portfolio.created_at = row.portfolio_created_at;
      portfolio.description = row.description;
      portfolio.item_title = row.item_title;
      portfolio.item_subtitle = row.item_subtitle;
      portfolio.item_icon = row.item_icon;
    }

    if (row.content_id && !contentIds.has(row.content_id)) {
      portfolioContent.push({
        id: row.content_id,
        content_type: row.content_type,
        content_data: row.content_data,
        order: row.content_order,
      });
      contentIds.add(row.content_id);
    }

    if (row.deliverable_id && !deliverableIds.has(row.deliverable_id)) {
      portfolioDeliverables.push({
        id: row.deliverable_id,
        name: row.deliverable_name,
        order: row.deliverable_order,
      });
      deliverableIds.add(row.deliverable_id);
    }
  });

  portfolio.portfolio_content = portfolioContent;
  portfolio.portfolio_deliverables = portfolioDeliverables;

  return portfolio;
};

const updatePortfolioOrder = async (id, order) => {
  const result = await executeQuery({
    query: getSQLQuery([3012]),
    params: [order, id],
  });
  if (!result.status) throw result;
  return result;
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  deleteProtfolioById,
  getPortfolioDetails,
  updatePortfolio,
  updatePortfolioOrder,
};
