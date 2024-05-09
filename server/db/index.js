const mongoose = require("mongoose");

mongoose.set("strictQuery", "false");

mongoose
  .connect(
    "mongodb+srv://themaroonalpha:zWmk0R2AEnLrdeiv@fullstack.3lxhlnb.mongodb.net/"
  )
  .then(() => console.log("connected mongoDB"))
  .catch((e) => console.log(e));
