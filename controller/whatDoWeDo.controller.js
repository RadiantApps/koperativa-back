const WhatWeDoModel = require("../model/whatDoWeDo.model");
const { validationWhatDoWeDo } = require("../validation/whatwedo/whatwedo");

exports.createWhatDoWeDo = async (req, res) => {
  const { title, description } = req.body;
  const { errors, isValid } = validationWhatDoWeDo(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const createResponse = await WhatWeDoModel.createWhatDoWeDo(
      title,
      description
    );

    return res.status(201).json({
      success: true,
      message: "What do we do content created successfull",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating content", error });
  }
};

exports.getWhatDoWedo = async (req, res) => {
  try {
    const response = await WhatWeDoModel.getWhatWeDo();
    res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting content", error });
  }
};

exports.deleteWhatDoWeDo = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await WhatWeDoModel.deleteWhatWeDo(id);
    res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleteing content", error });
  }
};
