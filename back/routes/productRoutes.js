import { getProducts, productId, getTopProducts } from "./product/productActions.js";
import express from 'express'

const productRoutes = express.Router()

productRoutes.route('/').get(getProducts)
productRoutes.route('/top').get(getTopProducts)
productRoutes.route('/:id').get(productId)

export default productRoutes