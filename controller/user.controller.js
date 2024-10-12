const { messageCodes } = require("../lib/messageCodes");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Missing in the original code
const {
  validationRegisterInput,
  validtionUpdateInput,
} = require("../validation/auth/auth");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      const message = await messageCodes({ code: 1001 });
      return res.status(404).json({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

const createUser = async (req, res) => {
  const { name, surname, email, phone, password, role } = req.body;
  const { errors, isValid } = validationRegisterInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  try {
    const checkIfUserExist = await userModel.getUserByEmail({ email });
    if (checkIfUserExist.length > 0) {
      const message = await messageCodes({ code: 1000 });
      return res.status(400).json({ message });
    }

    // Create user
    await userModel.createUser({
      name,
      surname,
      email,
      phone,
      password,
      role,
    });
    return res.status(201).json({ message: "User added succesfull" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const { errors, isValid } = validtionUpdateInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const updatedUser = await userModel.updateUser(id, req.body);
    if (updatedUser.length > 0) {
      return res.status(200).json(updatedUser[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userModel.deleteUser(id);
    if (deleted) {
      return res.status(200).json({ message: "User deleted successfull" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    userModel.getUserByEmail({ email }).then((results) => {
      const user = results[0];
      if (!user) {
        return res.status(404).json({
          message: "Email-i ose fjalkalimi janë gabimë!",
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(404).json({
          message: "Email-i ose fjalkalimi janë gabimë!",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        process.env.SECRETORKEY
      );

      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Interna Server Error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
