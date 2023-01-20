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
    } catch (err) {
      next(err);
    }
  },
};
