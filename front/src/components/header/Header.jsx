import { useState } from 'react';
import { Nav,NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import ResponsiveMobile from './ResponsiveMobile';
import logo from '../../../public/images/logo.svg'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start">
            <Link to="/" className="text-xl font-bold text-gray-900">
            <img src={logo} alt='logo' />
            </Link>
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
                <Nav.Link className='flex flex-row-reverse items-center gap-2 ' as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            <Link to="/" className="text-gray-900 hover:text-gray-600">
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
