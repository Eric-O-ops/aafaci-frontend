
// src/App.js
import React from 'react';
import Header from './components/Header';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import NationalPage from "./pages/NationalPage";
import AboutUs from "./pages/AboutUs";
function AppContent() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth'; // убедись, что маршрут точно /auth

  return (
      <>
          <Header fixed={isAuthPage} />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/productDetail" element={<ProductDetail />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/national" element={<NationalPage />} />
              <Route path="/category/:categoryName" element={<ProductsPage />} />
              <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer/>
      </>
  );
}


function App(){
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
