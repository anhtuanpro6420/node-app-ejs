const mongoose = require("mongoose");
const { dbUrl } = require("../config/env-variables");

mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log(err));
