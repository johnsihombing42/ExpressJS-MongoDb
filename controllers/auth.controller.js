const User = require("../models/User");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({
        username,
        email,
        password,
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
};
