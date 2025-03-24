import express from "express";
import cors from "cors";
import config from "./config/dotenv.js";
import connectDB from "./config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
// const FRONTEND_URL = config.url;
connectDB();

app.use(express.json());
app.use(cors({origin: "https://login-jwt-o8ol.vercel.app/" }));
app.options("*", cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);

app.listen(config.port, () => console.log(`Server running on ${config.port}`));