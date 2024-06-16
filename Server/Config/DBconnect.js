const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOODB_URI);
    if (connect.connection.readyState === 1) {
      console.log("Connected");
    } else {
      console.log("Error Connect");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = dbConnect;
