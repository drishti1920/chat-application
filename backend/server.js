import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.js";
import messageRoute from './routes/messageRoute.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoutes);


app.listen(5000, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
