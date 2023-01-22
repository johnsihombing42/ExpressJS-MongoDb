const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = {
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ id });
      if (!user)
        res.status(404).json({
          status: false,
          message: "User not found",
        });

      const userData = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        status: true,
        message: "success update data",
        data: userData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ id });
      if (!user)
        res.status(404).json({
          status: false,
          message: "User not found",
        });
      await user.findByIdAndDelete({ id });
      res.status(200).json({
        status: true,
        message: "Account has been deleted",
      });
    } catch (err) {
      next(err);
    }
  },
  read: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById({ id });
      const { password, updateAt, ...other } = user._doc;
      if (!user)
        res.status(404).json({
          status: false,
          message: "User not found",
        });
      res.status(200).json({
        status: true,
        message: "Account has been deleted",
        data: other,
      });
    } catch (err) {
      next(err);
    }
  },
  //follow a user
  follow: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({
          status: true,
          message: "User has been followed",
        });
      } else {
        res.status(403).json({
          status: false,
          message: "You already follow this user",
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
