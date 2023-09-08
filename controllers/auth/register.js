const { User } = require("../../models/user");

const gravatar = require("gravatar");


const { cntrlWrapper, HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
  const { email, password } = req.body;
 

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(email)
    
  const hashPassword = await bcrypt.hash(password, 10);
  

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL: avatar,
    });
    
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
};

module.exports = cntrlWrapper(register);
