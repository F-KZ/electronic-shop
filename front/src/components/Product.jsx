import Rating from './Ratings';
import { Link } from 'react-router-dom';

// src/components/Product.js
import React from 'react';
import ProductScreen from '../screens/ProductScreen';

const Product = ({ product }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg p-4 h-full">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <Link to={`/product/${product._id}`}>
        <h3 className="text-lg font-bold">{product.name}</h3>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        {/* <p className="text-gray-600">{product.description}</p> */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold">${product.price}</span>
        </div>
      </div>
    );
  };

export default Product;
