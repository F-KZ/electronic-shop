import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoBackButton from '../components/ReturnButton';
import { updateCart } from '../utils/cartUtils'
import { addToCart, removeProduct, resetCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { useEffect } from 'react'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty} ));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeProduct(id));
  };

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping')
  };

  /*const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  }; */

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetCart());
    }, 10 * 60 * 1000); // 20 minutes in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="w-full md:w-2/3 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <GoBackButton />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                  <div className="w-1/5">
                    <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg" />
                  </div>
                  <div className="w-2/5 pl-4">
                    <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-gray-600">
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-1/5">
                    <select
                      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/5 text-right">
                    <span className="text-lg font-bold">${item.price}</span>
                  </div>
                  <div className="w-1/5 text-right">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
              <h2 className="text-xl font-bold">Total Price:</h2>
              <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
