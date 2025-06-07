import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminProductForm from './pages/AdminProductForm.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header/>
            <main>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path='/product/:id' element={<ProductDetail/>}/>
                <Route path="/cart" element={<Cart/>} />
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/admin/products" element={<AdminProductForm/>} />
                <Route path="/admin/products/:id" element={<AdminProductForm/>} />
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </main>
            <Footer/>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
