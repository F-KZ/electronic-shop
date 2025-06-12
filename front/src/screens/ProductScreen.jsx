
import GoBackButton from '../components/ReturnButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import products from '../products'
import Rating from '../components/Ratings'
import {  useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader/Loader';


const ProductScreen = () => {
  const { id: productId } = useParams()
  const { data: product, error, isLoading } = useGetProductDetailsQuery(productId);
  const [ qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate('/cart')
  }


 

  if (isLoading) return <Loader/>;
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

 
  return (
    <div className="container mx-auto p-4">
      <GoBackButton />
      <div className="flex flex-wrap mt-4">
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover mb-4" />
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <p className="text-xl font-bold mt-2">Price: ${product.price}</p>
            <p className="mt-4">Description: {product.description}</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">Price:</span>
                <span className="font-bold text-xl">${product.price}</span>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? 'Disponible' : 'Rupture de stock'}
                </span>
              </div>
            </div>
            {product.countInStock > 0 && (
        <div className="border p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4 gap-4">
            <span className="font-bold">Qty</span>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
            <button
              className={`w-full bg-blue-500 text-white py-2 rounded shadow ${
                product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              type="button"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Ajouter au Panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
