const Contact = require("../models/contact");

const {  cntrlWrapper } = require("../helpers");


const add = async (req, res) => {
  const { _id: owner } = req.user;
  
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

module.exports = cntrlWrapper(add);