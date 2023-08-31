const Contact = require("../models/contact");

const { cntrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = cntrlWrapper(getAll);