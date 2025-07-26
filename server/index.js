import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/ConnectDB.js";
import userRouter from "./route/user-route.js";

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use("/api/user", userRouter);

let PORT = 8080;
if (process.argv[2] && process.argv[2].includes("-p")) {
  PORT = process.argv[2].split("=")[1] || 0;
} else {
  console.log("Flag is not present.");
}

app.get("/", (request, response) => {
  //server to client
  response.json({ message: "sever is running " + PORT });
});

connectDB()
  .then(() => {
    app.listen(PORT, (error) => {
      if (error) return console.error(error);

      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });
