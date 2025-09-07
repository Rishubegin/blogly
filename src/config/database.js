const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://hrishabho40:QwLZYh1tfvl0ajr5@cluster0.gxbsf2f.mongodb.net/blogly?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
