const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        status: true,
        message: "Success create data",
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
  },
};
