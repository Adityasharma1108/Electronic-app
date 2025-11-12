import React, { useState, useMemo } from "react";
// Import React Router components for navigation
import { Routes, Route, Link } from 'react-router-dom'; 

import ProductCard from "./ProductCard";

import CartPage from "./CartPage"; 
import HomeContent from "./HomeContent"; 
import CheckoutPage from "./CheckoutPage"; 
// 1. Import the new confirmation page component
import OrderConfirmationPage from "./OrderConfirmationPage"; 

import "./App.css";

// Import all necessary images (assuming these paths are correct)
import fridge from "./fridge.jpg";
import washing from "./Washing Machine.jpg";
import tv from "./Tv.jpg";
import Ac from "./AC1.jpg";
import Header from "./Header";
import AdityaElectronicsBar from "./AdityaElectronicsBar";
import saleBanner1 from "./dron.jpg";
import saleBanner2 from "./camera.jpg";
import saleBanner3 from "./visuallll.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [cart, setCart] = useState([]);

  // ----------------------------------------------------
  // 1. PRODUCT & AD DATA (FIXED: Data restored here!)
  // ----------------------------------------------------
  const products = [
    { id: 1, name: "Refrigerater", price: 120000, img: fridge },
    { id: 2, name: "Washing-Machine", price: 40000, img: washing },
    { id: 3, name: "LED-TV", price: 25000, img: tv },
    { id: 4, name: "AC", price: 37500, img: Ac },
    { id: 5, name: "Dish Washer", price: 30000, img: washing },
    { id: 6, name: "4K Projector", price: 75000, img: tv },
  ];

  // FIXED: Data for the large top banner slider (sliderItems)
  const sliderItems = [ 
    { id: 1, img: saleBanner1, alt: "Summer Sale Banner" },
    { id: 2, img: saleBanner2, alt: "50% Off Banner" },
    { id: 3, img: saleBanner3, alt: "New Arrival Banner" },
  ];

  // FIXED: Data for the trending products slider (trendingProducts)
  const trendingProducts = [ 
    { id: 301, name: "Luxury Fridge", details: "Smart touch screen & AI cooling.", img: fridge, color: '#f5f5f5' },
    { id: 302, name: "Pro Gamer TV", details: "120Hz refresh, perfect for gaming.", img: tv, color: '#e0f7fa' },
    { id: 303, name: "Silent AC", details: "Eco-friendly, ultra-quiet operation.", img: Ac, color: '#fff3e0' },
    { id: 304, name: "Premium Washer", details: "Auto-dosing and steam cleaning.", img: washing, color: '#fafafa' },
  ];

  // --- SLIDER SETTINGS (Unchanged) ---
  const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 400 };
  const productSliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1, responsive: [{ breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } }, { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } }, { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } }] };
  const specialSliderSettings = { dots: true, infinite: true, speed: 800, slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 400, centerMode: true, centerPadding: "100px", responsive: [{ breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "60px" } }, { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: "40px" } }] };


  // ----------------------------------------------------
  // 3. CART FUNCTIONS (Quantity logic is correct)
  // ----------------------------------------------------

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1, };
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


  // ----------------------------------------------------
  // 4. THE RENDER / RETURN SECTION (ROUTES)
  // ----------------------------------------------------

  return (
    <div className="App">
      {/* NAVIGATION / HEADER BAR (Fixed across all pages) */}
      <div
        className="Header-bar"
        style={{
          backgroundColor: '#050608ff',
          color: 'white',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>
          {/* Link back to the homepage */}
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            ⚡Welcome to Harit's Electronic Shop!⚡
          </Link>
        </h2>
        
        <Header />
        
        {/* Cart Button is now a Link to the Cart Page */}
        <Link to="/cart" className="cart-icon-link">
          Cart ({cartCount})
        </Link>
      </div>

      {/* ROUTER SETUP: This switches content based on URL */}
      <Routes>
        {/* 1. HOME ROUTE: Loads HomeContent component */}
        <Route 
            path="/" 
            element={
                <HomeContent 
                    products={products}
                    sliderItems={sliderItems} // Now contains data!
                    trendingProducts={trendingProducts} // Now contains data!
                    addToCart={addToCart}
                    sliderSettings={sliderSettings}
                    productSliderSettings={productSliderSettings}
                    specialSliderSettings={specialSliderSettings}
                />
            } 
        />
        
        {/* 2. CART PAGE ROUTE: Loads CartPage component */}
        <Route 
            path="/cart" 
            element={
                <CartPage 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    addToCart={addToCart} 
                />
            } 
        />

        {/* 3. CHECKOUT PAGE ROUTE: Loads CheckoutPage component */}
        <Route 
            path="/checkout" 
            element={
                <CheckoutPage 
                    cart={cart} 
                />
            } 
        />
        
        {/* 4. ORDER CONFIRMATION ROUTE: Displays success page after checkout */}
        <Route 
            path="/order-placed" 
            element={<OrderConfirmationPage />} 
        />

      </Routes>
      
      <AdityaElectronicsBar />
    </div>
  );
}

export default App;