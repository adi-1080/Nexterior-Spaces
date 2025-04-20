import mongoose from "mongoose";
import "dotenv/config";
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `MONGODB Database Connected Established \nHOST: ${connection.connection.host} \nDATABASE_NAME: ${connection.connection.db.databaseName}`
    );
  } catch (error) {
    console.log(`Error while connecting to DB!!`, error);
    throw error;
  }
};
