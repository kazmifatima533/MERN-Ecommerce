import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// ✅ Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const uploadedImages = [];

    for (let key of Object.keys(req.files)) {
      const file = req.files[key][0];
      const uploaded = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
        folder: "products",
      });
      uploadedImages.push(uploaded.secure_url);
    }

    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      image: uploadedImages,
      date: Date.now(),
    });

    await newProduct.save();

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("Add product error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ List All Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("List product error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Remove Product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Remove product error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Single Product Details
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Get product error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
};
