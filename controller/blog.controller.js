const BlogModel = require("../model/blog.model");
const { validationBlog } = require("../validation/blog/blog");

exports.getBlogs = async (req, res) => {
  try {
    const response = await BlogModel.getBlogs();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

exports.getBlgById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BlogModel.getBlogById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

exports.createBlogs = async (req, res) => {
  const { title } = req.body;
  const photo = req.file.path;

  const { errors, isValid } = validationBlog(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }
  try {
    const response = await BlogModel.createBlogs(title, photo);
    res.status(201).json({
      success: true,
      message: "Blog created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

exports.deleteBlogs = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BlogModel.deleteBlogs(id);
    res.json({
      success: true,
      message: "Blog deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing blogs", error });
  }
};
