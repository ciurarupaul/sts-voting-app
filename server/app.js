import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// import routes here

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5173"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
		enablePreflight: true,
	})
);

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Routes

export default app;
