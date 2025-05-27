const CommentStaffModel = require("../model/commentStaff.model");
const { validationCommentStaff } = require("../validation/comment/comment");

exports.getCommentStaff = async (req, res) => {
  try {
    const result = await CommentStaffModel.getCommentStaff();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching commentStaff", error });
  }
};

exports.createCommentStaff = async (req, res) => {
  const { name, position, comment } = req.body;
  const photo = req.file.key;

  const { errors, isValid } = validationCommentStaff(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createCommentStaffResponse =
      await CommentStaffModel.createCommentStaff(
        name,
        position,
        comment,
        photo
      );
    return res.status(201).json({ message: "Comment staff added succesfull" });
  } catch (error) {
    res.status(500).json({ message: "Error creating commentStaff", error });
  }
};

exports.deleteCommentStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await CommentStaffModel.deleteCommentStaff(id);
    return res.status(200).json({
      success: true,
      message: "Comment Staff deleted successfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting comment staff", error });
  }
};
