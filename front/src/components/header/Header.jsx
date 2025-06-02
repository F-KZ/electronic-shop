import { useState } from 'react';
import { Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaHome, FaSearch } from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import ResponsiveMobile from './ResponsiveMobile';
import logo from '../../../public/images/logo.svg'
import { resetCart } from '../../slices/cartSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-8 flex-1">
            <Link to="/" className="text-xl font-bold text-gray-900">
            <img src={logo} alt='logo' />
            </Link>
            <Form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="flex gap-2">
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="primary" className="flex items-center gap-2">
                  <FaSearch /> Search
                </Button>
              </div>
            </Form>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-gray-600 flex gap-2 items-center">
              Home <FaHome/>
            </Link>
            <Link to="/cart" className="text-gray-900 hover:text-gray-600 flex gap-2 items-center">
              Cart <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full ml-2">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
              <Nav.Link className='flex flex-row-reverse items-center gap-2' as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            <Link to="/contact" className="text-gray-900 hover:text-gray-600">
              Contact
            </Link>
          </div>
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

        {/* Categories Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <ul className="flex justify-center space-x-8 py-3">
            {categories.map((category) => (
              <li key={category.path}>
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
        />}
      </div>
    </header>
  );
};

export default Header;
