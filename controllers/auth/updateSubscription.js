const { User, schemas } = require("../../models/user");

const { HttpError, cntrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const { _id } = req.user;
    const { error } = schemas.subscriptionSchema.validate(req.body);
    if (error) {
      throw (HttpError(400, "missing or wrong field subscription" ));
    }
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "updated success",
      data: {
        result: updatedUser,
      },
    });

   

};

module.exports = cntrlWrapper(updateSubscription);
