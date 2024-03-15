import express from "express";
export const app = express();
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
require("dotenv").config();
import userRouter from "./routes/user.routes";
import path from "path";
import listingRouter from "./routes/listing.routes";
import notificationRouter from "./routes/notification.routes";
import analyticsRouter from "./routes/analytics.routes";
import reviewsRouter from "./routes/reviews.routes";
import axios from "axios";

const routers = [
  notificationRouter,
  userRouter,
  listingRouter,
  analyticsRouter,
  reviewsRouter,
];


//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/layouts"));
app.use(express.static(path.join(__dirname, "public")));

//cookie parser
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
app.use("/api/v1", routers);

//test route
app.get("/api/v1/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "API wrking",
    success: true,
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

//error middleware
app.use(ErrorMiddleware);
