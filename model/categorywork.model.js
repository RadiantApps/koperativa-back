const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getCategoryWorks = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1029]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const createCategoryWorks = async (name) => {
  const result = await executeQuery({
    query: getSQLQuery([2022]),
    params: [name],
  });
  if (!result?.status) throw result;
  return result;
};

const deleteCategoryWorks = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4018]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result;
};

module.exports = {
  getCategoryWorks,
  createCategoryWorks,
  deleteCategoryWorks,
};
