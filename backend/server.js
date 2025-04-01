import express from "express";
import cors from "cors";
import config from "./config/dotenv.js";
import connectDB from "./config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import {API } from "./utils/allApis.js";
import { superAdmin } from "./utils/SuperAdmin.js";

const app = express();
// const FRONTEND_URL = config.url;
connectDB().then(()=>{
  superAdmin()
}).catch((e)=>{console.log(e)});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.options("*", cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(API.AUTH, authRoutes);
app.use(API.MOVIE, movieRoutes);

app.listen(config.port, () => console.log(`Server running on ${config.port}`));
