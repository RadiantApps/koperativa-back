const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const createContent = async (type, description) => {
  const result = await executeQuery({
    query: getSQLQuery([2005]),
    params: [type, description],
  });

  if (!result.status) throw result;
  return result?.data;
};

const getContent = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1009]),
  });

  if (!result.status) throw result;
  return result?.data;
};

const editContent = async (id, content) => {
  const result = await executeQuery({
    query: getSQLQuery([3002]),
    params: [content, id],
  });

  if (!result.status) throw result;
  return result?.data;
};

const getBannerHome = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1027]),
  });
  if (!result.status) throw result;
  return result?.data;
};

const createBannerHome = async (url) => {
  const result = await executeQuery({
    query: getSQLQuery([2021]),
    params: [url],
  });

  if (!result.status) throw result;
  return result?.data;
};

const deleteBannerHome = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4017]),
    params: [id],
  });

  if (!result.status) throw result;
  return result?.data;
};
module.exports = {
  createContent,
  getContent,
  editContent,
  getBannerHome,
  createBannerHome,
  deleteBannerHome,
};
