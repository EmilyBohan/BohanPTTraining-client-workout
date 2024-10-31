import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import logger from "morgan";
import { connectDB } from "./config/database.js";
import configurePassport from "./config/passport.js";
import mainRoutes from "./routes/main.js";
const app = express();

// Passport config
configurePassport(passport);

// Connect To Database
connectDB();

// Allow CORS for multiple origins
const allowedOrigins = [
  "http://localhost:5173", // Your local development URL
  "https://mern-template-rt27.onrender.com", // Replace with your Vercel deployment URL
  "https://mern-template-client.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin); // Add this line to debug the origin
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log("Not allowed by CORS:", origin); // Add this line to debug rejected origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logs HTTP requests and shows in your server with colors and timestamps
app.use(logger("dev"));

// Passport sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    cookie: {
      sameSite: "none",
      secure: true,
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

// Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT 5050");
});
