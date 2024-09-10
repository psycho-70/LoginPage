import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Specify the collection name as 'logindata'
const User = mongoose.model('User', userSchema, 'logindata');

export default User; // Default export
