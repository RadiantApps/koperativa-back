const CommentModel = require("../model/comment.model");
const { validationComment } = require("../validation/comment/comment");

exports.getComment = async (req, res) => {
  try {
    const response = await CommentModel.getComment();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

exports.createComment = async (req, res) => {
  const { name, title, comment } = req.body;
  const photo = req.file.path;

  const { errors, isValid } = validationComment(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createResponse = await CommentModel.createComment(
      name,
      title,
      comment,
      photo
    );
    res.status(201).json({
      success: true,
      message: "Comment created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating comments", error });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await CommentModel.deleteComment(id);
    res.json({
      success: true,
      message: "Comment deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing comments", error });
  }
};
