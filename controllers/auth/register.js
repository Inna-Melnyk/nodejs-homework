const { User } = require("../../models/user");
const gravatar = require("gravatar");
const { cntrlWrapper, HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

// const sendEmail = require("../../helpers")

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email </a>`,
  };

  await sendEmail(verifyEmail);

  // sendEmail({
  //   to: email, // Change to your recipient
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // });
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
