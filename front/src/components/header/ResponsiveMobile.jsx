import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHome, FaTruck, FaStore, FaHeadset } from 'react-icons/fa';

const ResponsiveMobile = ({ cartItems, userInfo, logoutHandler, services }) => {
  return (
    <div className="md:hidden flex flex-col gap-4 pb-4 px-4 bg-white animate-slideDown">
      {/* Services */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Services</h3>
        {services.map((service) => (
          <Link 
            key={service.path}
            to={service.path} 
            className="text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
          >
            {service.icon} {service.name}
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
        <Link to="/" className="text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
          <FaHome className="text-lg" /> Home
        </Link>
        <Link to="/cart" className="text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
          <FaShoppingCart className="text-lg" /> Cart
          {cartItems.length > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        {userInfo ? (
          <>
            <Link to="/profile" className="text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
              <FaUser className="text-lg" /> {userInfo.name}
            </Link>
            <button 
              onClick={logoutHandler} 
              className="text-left text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-900 hover:text-gray-600 flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
            <FaUser className="text-lg" /> Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMobile;
