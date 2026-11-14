import cors from "cors";
import express from "express";
import { connectDB } from "./db.js";
import listingRoutes from "./routes/listingRoutes.js";

const app = express();

// ========== MIDDLEWARE ==========
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

// Let our React app read our answers
app.use(cors());
// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send("Welcome to ebd bn'b");
});

// Is the API up?
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/listings", listingRoutes);

// ========== START ==========
await connectDB();
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
