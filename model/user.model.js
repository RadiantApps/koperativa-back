const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1000]),
  });
  if (!result?.status) throw result;
  return result.data;
};

const getUserById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1002]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const createUser = async ({ name, surname, email, phone, password, role }) => {
  const result = await executeQuery({
    query: getSQLQuery([2000]),
    params: [name, surname, email, phone, bcrypt.hashSync(password, 10), role],
  });
  if (!result?.data) throw result;
  return result;
};

const getUserByEmail = async ({ email }) => {
  const result = await executeQuery({
    query: getSQLQuery([1001]),
    params: [email],
  });
  if (!result?.status) throw result;
  return result.data;
};

const updateUser = async (id, userData) => {
  let query = `
    UPDATE users
    SET 
      name = COALESCE(?, name),
      surname = COALESCE(?, surname),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      role = COALESCE(?, role)
  `;

  let params = [
    userData?.name,
    userData?.surname,
    userData?.email,
    userData?.phone,
    userData?.role,
  ];

  if (userData?.password) {
    const hashPassword = bcrypt.hashSync(userData?.password, 10);
    query += ", password = ?";
    params.push(hashPassword);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  // Execute the query
  const result = await executeQuery({
    query: query,
    params: params,
  });

  if (!result?.status) throw result;
  return result.data;
};

const deleteUser = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4000]),
    params: [id],
  });

  if (!result?.data) throw result;
  return result;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
