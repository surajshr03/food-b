import { Schema } from "mongoose";

//user-resigtration ma -> 
let userSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required."],
    },
    password: {
      type: String,
      required: [true, "password is required."],
    },
    //yo part paxi controller ma as an object pass garney
    isVerifiedEmail: {
      type: Boolean,
      required: [false, "isVerifiedEmail error."],
    },
    role: {
      type: String,
      required: [false, "role is required."],
    },
  },
  {
    timestamps: true,
  }
);
export default userSchema