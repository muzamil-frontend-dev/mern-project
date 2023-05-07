import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `✅✅✅ Application is connected with host: ${connect.connection.host}`
    );
  } catch (error) {
    console.log(
      colors.bgRed(`❌❌❌ Error connecting database: ${error.message}`)
    );
    process.exit(1);
  }
};

export default connectDb;
