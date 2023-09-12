const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const { cntrlWrapper } = require("../../helpers");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatar");

const updateAvatar = async (req, res) => {
  console.log("REQ.FILE", req.file);

  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  try {
    const image = await Jimp.read(tmpUpload);
    image.resize(250, 250);
    await image.writeAsync(tmpUpload);
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatar", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      status: "updated success",
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink();
    throw error;
  }
};

module.exports = cntrlWrapper(updateAvatar);
