import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <main>
              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<h1>Register Page</h1>} />
                <Route path="/cart" element={<h1>Cart Page</h1>} />
                <Route path="/admin/products" element={<h1>Products Page</h1>} />
                <Route path="/admin/products/:id" element={<h1>Product Details Page</h1>} />
              </Routes>
            </main>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
