const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.DB_URL);
    console.log(
      ` DB Connected\n DB Name: ${response.connection.name}\n DB Host: ${response.connection.host}`,
    );
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
