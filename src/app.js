import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config()

export const app = express();

const PORT = process.env.PORT || 8000

let DB;
if (process.env.NODE_ENV === 'development') {
  DB = process.env.DATABASE_URL
}
if (process.env.NODE_ENV === 'test') {
  DB = process.env.DATABASE_URL_TEST
}

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

app.use(express.json());

// for logging
// app.all('*', function (req, res, next) {
//   console.log('INCOMING API HIT')
//   console.log('Time: ', new Date(Date.now()).toDateString())
//   console.log('Request URL : ' + req.originalUrl)
//   console.log('Request Method : ' + req.method)
//   console.log(' ');
//   next()
// })

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is running on 0.0.0.0:${PORT}`));