require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { PORT, MONGO_URL } = process.env;
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(router);

mongoose.connect(MONGO_URL);

app.get("/", (req, res) => {
  return res.status(404).json({
    status: true,
    message: "Welcome folks",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
