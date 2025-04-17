const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getBlogDetailsContent = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1019]),
    params: [id],
  });
  if (!result.status) throw result;
  return result.data;
};
const createBlogDetails = async (blogId, type, data, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2014]),
    params: [blogId, type, data, order],
  });
  if (!result.status) throw result;
  return result;
};
const deleteBlogDetails = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4010]),
    params: [id],
  });
  if (!result.status) throw result;
  return result;
};

const updateBlogDetails = async (type, data, blogId) => {
  const result = await executeQuery({
    query: getSQLQuery([3011]),
    params: [type, data, blogId],
  });
  if (!result.status) throw result;
  return result;
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
  getBlogDetailsContent,
  createBlogDetails,
  deleteBlogDetails,
  updateBlogDetails,
  updatetOrderItem,
};
