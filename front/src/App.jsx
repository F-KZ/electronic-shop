import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Router, Routes, Route} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { Container } from 'react-bootstrap';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';




function App() {
  

  return (
    <BrowserRouter>
     <Header/>
    <div className='flex flex-col gap-6 items-center'>
     <Container className='p-8'>
    <Routes>
     <Route path="/" element={<HomeScreen/>} />
     <Route path="/product/:id" element={<ProductScreen/>} />
     <Route path="/cart" element={<CartScreen/>} />
     <Route path="/login" element={<LoginScreen/>} />
     </Routes>
     </Container>
     </div>
     <Footer/>
    
    </BrowserRouter>
  )
}



export default App
