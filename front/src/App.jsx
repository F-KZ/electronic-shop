import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { Container } from 'react-bootstrap';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './components/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';


function App() {
  

  return (
    <BrowserRouter>
    <ToastContainer />
     <Header/>
    <div className='flex flex-col gap-6 items-center min-h-[80vh]'>
     <Container className='p-8'>
    <Routes>
     <Route path="/" element={<HomeScreen/>} />
     <Route path="/product/:id" element={<ProductScreen/>} />
     <Route path="/cart" element={<CartScreen/>} />
     <Route path="/login" element={<LoginScreen/>} />
     <Route path="/register" element={<RegisterScreen/>} />
     <Route path="" element={<PrivateRoute/>}>
     <Route path="/shipping" element={<ShippingScreen/>} />
     <Route path="/payment" element={<PaymentScreen/>} />
     <Route path="/placeorder" element={<PlaceOrderScreen/>} />
     </Route>
     </Routes>
     </Container>
     </div>
     <Footer/>
    
    </BrowserRouter>
  )
}

export default App
