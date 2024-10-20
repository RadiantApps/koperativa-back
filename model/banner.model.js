const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getBanner = async (type) => {
  const result = await executeQuery({
    query: getSQLQuery([1023]),
    params: [type],
  });

  if (!result.status) throw result;
  return result?.data;
};

const createCareerSlider = async (photo) => {
  const result = await executeQuery({
    query: getSQLQuery([2018]),
    params: [photo],
  });

  if (!result.status) throw result;
  return result?.data;
};

const getCareerSlider = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1024]),
  });

  if (!result.status) throw result;
  return result?.data;
};

const deleteCareerSlider = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4013]),
    params: [id],
  });
  if (!result.status) throw result;
  return result?.data;
};

module.exports = {
  getBanner,
  createCareerSlider,
  getCareerSlider,
  deleteCareerSlider,
};
