import jwt from "jsonwebtoken"

import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json({
      status: res.statusCode,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: false, __v: false, createdAt: false, updatedAt: false });
    res.json({
      status: res.statusCode,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const getUserByAccountNumber = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(404).json({ message: "No user with that Account Number" });
    res.json({
      status: res.statusCode,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const getUserByIdentityNumber = async (req, res) => {
  try {
    const identityNumber = req.params.identityNumber
    const user = await User.findOne({ identityNumber });
    if (!user) return res.status(404).json({ message: "No user with that Identity Number" });
    res.json({
      status: res.statusCode,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const updateUserByIdentityNumber = async (req, res) => {
  const identityNumber = req.params.identityNumber
  const user = await User.findOne({ identityNumber });
  if (!user) return res.status(404).json({ message: "No user with that Identity Number" });
  try {
    const update = req.body
    const parameter = await User.findOneAndUpdate(identityNumber, update)
    res.status(200).json({
      status: res.statusCode,
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const deleteUserByIdentityNumber = async (req, res) => {
  const identityNumber = req.params.identityNumber
  const user = await User.findOne({ identityNumber });
  if (!user) return res.status(404).json({ message: "No user with that Identity Number" });
  try {
    const deletedUser = await User.deleteOne({ identityNumber });
    res.status(200).json({
      status: res.statusCode,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message
    });
  }
}

export const login = async (req, res) => {
  try {
    const { userName, emailAddress } = req.body
    const user = await User.findOne({ userName, emailAddress });
    if (!user) return res.status(404).json({ message: "wrong username or email address" });
    const token = jwt.sign({ _id: user._id }, process.env.APP_KEY)
    res.header('authorization-token', token).json({
      status: res.statusCode,
      message: 'login successfully',
      token: token
    })
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: error.message
    });
  }
}