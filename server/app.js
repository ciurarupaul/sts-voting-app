import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// import routes here
import authRouter from "./routes/authRoutes.js";
import voteRouter from "./routes/voteRoutes.js";
import playRouter from "./routes/playRoutes.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173", // front-end url
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true, // allow cookies
	})
);

// middleware setup
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// routes
app.use("/api/auth", authRouter);
app.use("/api/vote", voteRouter);
app.use("/api/play", playRouter);

export default app;
