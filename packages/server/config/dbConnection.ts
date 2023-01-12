// import { User } from "../models/user";

import mongoose from "mongoose";

const connectDatabase = () => {
  if (!process.env.MONGO_URI) {
    console.log("Mongo DB Connection URL is not Provided");
    return;
  }
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async (db) => {
      console.log("Mongoose Connected");

      // Uncomment the code to add user to database.
      // Added two static user for testing.
      // Only for practical purpose. Not a recommended in production

      // await User.insertMany([
      //   {
      //     password: "customer123",
      //     username: "customer123",
      //   },
      // ]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;
