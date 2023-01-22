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
};
