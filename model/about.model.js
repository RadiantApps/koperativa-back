const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const createContent = async (type, description) => {
  const result = await executeQuery({
    query: getSQLQuery([2015]),
    params: [type, description],
  });

  if (!result.status) throw result;
  return result?.data;
};

const getContent = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1021]),
  });

  if (!result.status) throw result;
  return result?.data;
};

const editContent = async (id, content) => {
  const result = await executeQuery({
    query: getSQLQuery([3004]),
    params: [content, id],
  });

  if (!result.status) throw result;
  return result?.data;
};

const createSlider = async (url) => {
  const result = await executeQuery({
    query: getSQLQuery([2016]),
    params: [url],
  });

  if (!result.status) throw result;
  return result?.data;
};

const getSlider = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1022]),
  });

  if (!result.status) throw result;
  return result?.data;
};

const deleteSlider = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4012]),
    params: [id],
  });

  if (!result.status) throw result;
  return result?.data;
};

const addPhoto = async (photo, type) => {
  const result = await executeQuery({
    query: getSQLQuery([2017]),
    params: [photo, type],
  });
  if (!result.status) throw result;
  return result?.data;
};

const updatePhoto = async (id, photo) => {
  const result = await executeQuery({
    query: getSQLQuery([3005]),
    params: [photo, id],
  });
  if (!result.status) throw result;
  return result?.data;
};
module.exports = {
  createContent,
  getContent,
  editContent,
  createSlider,
  getSlider,
  deleteSlider,
  addPhoto,
  updatePhoto,
};
