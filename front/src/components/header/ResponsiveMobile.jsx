import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';

const ResponsiveMobile = ({ cartItems, userInfo, logoutHandler }) => {
  return (
    <div className="md:hidden flex flex-col gap-2 pb-2">
      <Link to="/" className="text-gray-900 hover:text-gray-600 flex flex-row gap-2 items-center">
        Home <FaHome/>
      </Link>
      <Link to="/cart" className="text-gray-900 hover:text-gray-600 flex flex-row gap-2 items-center">
        Cart <FaShoppingCart />
        {cartItems.length > 0 && (
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full ml-2">
            {cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
        )}
      </Link>
      {userInfo ? (
        <>
          <Link to="/profile" className="text-gray-900 hover:text-gray-600 flex flex-row gap-2 items-center">
            {userInfo.name} <FaUser />
          </Link>
          <button onClick={logoutHandler} className="block text-gray-900 py-2">
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login" className="text-gray-900 hover:text-gray-600 flex flex-row gap-2 items-center">
          Sign In <FaUser />
        </Link>
      )}
      <Link to="/" className="text-gray-900 hover:text-gray-600 flex flex-row gap-2 items-center">
        Contact
      </Link>
    </div>
  );
};

export default ResponsiveMobile;
