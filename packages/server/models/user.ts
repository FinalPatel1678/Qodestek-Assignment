import mongoose from "mongoose";

export interface IUserRequest {
  username: string;
  password: string;
}

export interface IUserResponse extends IUserRequest {
  _id: string;
  token?: string;
}

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 12,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
