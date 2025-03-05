const express = require("express");
const cors = require("cors");
const config = require("./config/dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("middleware executed");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Hello, world");
// });

app.use("/api/auth", authRoutes);


app.listen(config.port, () => console.log(`Server running on ${config.port}`));
