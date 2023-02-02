import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config()

export const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// for logging
// app.all('*', function (req, res, next) {
//   console.log('INCOMING API HIT')
//   console.log('Time: ', new Date(Date.now()).toDateString())
//   console.log('Request URL : ' + req.originalUrl)
//   console.log('Request Method : ' + req.method)
//   console.log(' ');
//   next()
// })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
})