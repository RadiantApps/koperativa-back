const LatestWorkModel = require("../model/latestwork.model");

exports.getLatestWork = async (req, res) => {
  try {
    const response = await LatestWorkModel.getLatestWork();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error getting LatestWork ", error });
  }
};

exports.createLatestWork = async (req, res) => {
  const { refId, type } = req.body;

  const existingLatestWork = await LatestWorkModel.getLatestWork();
  const existingOrders = existingLatestWork.map((item) => item.order);
  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

  try {
    const response = await LatestWorkModel.createLatestWork(
      refId,
      type,
      nextOrder
    );
    res.status(201).json({
      success: true,
      message: `Latest work added successfull`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating ", error });
  }
};

exports.deleteLatestWork = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await LatestWorkModel.deleteLatestWork(id);
    res.json({
      success: true,
      message: "Latest deleted successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting latestwork", error });
  }
};

exports.updateOrder = async (req, res) => {
  const { items } = req.body;

  const itemsArr = JSON.parse(items);
  try {
    const promises = itemsArr.map((item) =>
      LatestWorkModel.updateLatestWorkOrder(item.id, item.order)
    );
    await Promise.all(promises);

    return res.status(200).json({
      message: "Teams items updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating Teams order", error });
  }
};
