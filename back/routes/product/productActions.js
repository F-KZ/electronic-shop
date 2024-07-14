import Product from "../../models/productModel.js";
//import products from "../../data/products";
import asyncHandler from "express-async-handler"


const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

const productId = asyncHandler( async( req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
})  

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(topProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top products' });
  }
});

export { getProducts, productId, getTopProducts }