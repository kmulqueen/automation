const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI;
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
