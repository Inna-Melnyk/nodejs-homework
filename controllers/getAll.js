const Contact = require("../models/contact");

const { cntrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
  res.json(result);
};

module.exports = cntrlWrapper(getAll);
