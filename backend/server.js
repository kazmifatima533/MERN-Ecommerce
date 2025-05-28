import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from './routes/cartRoute.js'



// INFO: Create express app
const app = express();
const port = process.env.PORT || 4000;

// INFO: Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: [process.env.Domin_ulr1, process.env.Domin_ulr2,], // Array of allowed origins (strings or regex)
  credentials: true, // Allow cookies and other auth data
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// ✅ Serve static files from /uploads
app.use("/uploads", express.static(path.resolve("uploads")));

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter)

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Start server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
