import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = () => {
  mongoose.connect(process.env.DB_URL, {
    
  }).then((con) => {
    console.log(`db connected successfully with connection string:${con.connection.host}`);
  });
};
