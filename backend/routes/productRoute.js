import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Route to add a product (admin only, with image upload)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Route to remove a product (admin only)
productRouter.post("/remove", adminAuth, removeProduct);

// Route to get a single product by ID
productRouter.post("/single", getSingleProduct);

// Route to list all products
productRouter.get("/list", listProducts);

export default productRouter;
