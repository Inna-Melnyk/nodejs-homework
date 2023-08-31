const Contact = require("../models/contact");

const { HttpError, cntrlWrapper} = require("../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "delete success" });
};

module.exports = cntrlWrapper(deleteById);