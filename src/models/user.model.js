import mongoose from "mongoose";

const User = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  accountNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 999,
    index: { unique: true, sparse: true },
  },
  emailAddress: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  identityNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 999,
    index: { unique: true, sparse: true },
  }
}, { timestamps: true });

export default mongoose.model('Users', User);