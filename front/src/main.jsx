import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



//import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store.js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HelmetProvider>
  <Provider store={store}>
  <PayPalScriptProvider >
    <App />
    </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
