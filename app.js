import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from 'cloudinary';
//configure env
dotenv.config();

//database configuration

cloudinary.config({
  cloud_name: 'dgdufs4ek',
  api_key: '947789948839289',
  api_secret: 'alB2lzv9_6FnTH5O_OWoYx3y2X0'
});

try {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  //console.log(`connected to Mongodb Database ${conn.connection.host}`);
} catch (error) {
  // console.log(`Error in Mongodb ${error}`.bgRed.white);
}

//rest object
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();


const corsOptions = {
  origin: '*',
  method: "GET,POST,PUT,DELETE",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,

}

//middlewares
app.use(cors(corsOptions));
app.use(express.json()); //earlier we uses body parser
// app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.json("hello");
})
//rest api
// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//port number
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("connected to db")
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.white);
  }
  console.log(`server started on PORT ${PORT}`);
});
