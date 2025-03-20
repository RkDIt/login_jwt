const express = require("express");
const cors = require("cors");
const config = require("./config/dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const FRONTEND_URL = config.url;
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);

app.listen(config.port, () => console.log(`Server running on ${config.port}`));
