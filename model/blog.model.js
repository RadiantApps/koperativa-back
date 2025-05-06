const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getBlogs = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1018]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const getBlogById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1020]),
    params: [id],
  });
  if (!result.status) throw result;
  return result.data[0];
};

const createBlogs = async (title, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2013]),
    params: [title, photo],
  });
  if (!result?.status) throw result;
  return result;
};

const updateBlogs = async (title, photo, id) => {
  const result = await executeQuery({
    query: getSQLQuery([3014]),
    params: [title, photo, id],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteBlogs = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4009]),
    params: [id],
  });

  const deleteLatestWork = await executeQuery({
    query: getSQLQuery([4023]),
    params: [id],
  });
  if (!deleteLatestWork?.data) throw deleteLatestWork;

  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getBlogById,
  deleteBlogs,
  createBlogs,
  getBlogs,
  updateBlogs,
};
