const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.DBURL);
    console.log(
      ` DB Connected\n DB Name: ${response.connection.name}\n DB Host: ${response.connection.host}`,
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
