import { useState, useEffect } from 'react';
import { Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaHome, FaSearch, FaTruck, FaStore, FaHeadset } from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import ResponsiveMobile from './ResponsiveMobile';
import logo from '../../../public/images/logo.svg'
import { resetCart } from '../../slices/cartSlice';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const categories = [
    { name: 'Smartphones', path: '/category/smartphones' },
    { name: 'Laptops', path: '/category/laptops' },
    { name: 'Tablets', path: '/category/tablets' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Audio', path: '/category/audio' },
    { name: 'Gaming', path: '/category/gaming' },
  ];

  const services = [
    { name: 'Livraison', icon: <FaTruck />, path: '/delivery' },
    { name: 'Magasins', icon: <FaStore />, path: '/stores' },
    { name: 'Service Client', icon: <FaHeadset />, path: '/support' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCart())
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {/* Top Bar - Services */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-6">
              {services.map((service) => (
                <Link 
                  key={service.path}
                  to={service.path} 
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  {service.icon} {service.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' className="text-sm">
                  <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <FaUser /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-8 sm:gap-0">
          <div className="flex items-center gap-4 flex-1">
            <Link to="/" className="text-xl font-bold text-gray-900">
              <img src={logo} alt='logo' className="h-8 md:h-10" />
            </Link>
            <Form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="flex">
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-r-none"
                />
                <Button type="submit" variant="primary" className="flex items-center rounded-l-none">
                  <FaSearch />{width > 768 ? 'Search' : ''}
                </Button>
              </div>
            </Form>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="text-gray-900 hover:text-gray-600 flex gap-2 items-center">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-900 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="border-t border-gray-200">
          <ul className="flex overflow-x-auto md:justify-center space-x-8 py-3 px-4 md:px-0">
            {categories.map((category) => (
              <li key={category.path} className="whitespace-nowrap">
                <Link
                  to={category.path}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isOpen && <ResponsiveMobile 
          cartItems={cartItems}
          userInfo={userInfo}
          logoutHandler={logoutHandler}
          services={services}
        />}
      </div>
    </header>
  );
};

export default Header;
