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

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.get("/test", (req, res) => {
    res.json({ message: "Backend is running!" });
  });
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);

app.listen(config.port, () => console.log(`Server running on ${config.port}`));
