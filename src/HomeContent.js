// HomeContent.js
import React from 'react';
import Slider from "react-slick"; 
import ProductCard from "./ProductCard";
import AdityaElectronicsBar from './AdityaElectronicsBar';
const HomeContent = ({ 
    products, 
    sliderItems, 
    trendingProducts, 
    addToCart, 
    sliderSettings,
    productSliderSettings,
    specialSliderSettings 
}) => {
  return (
    <>
        {/* 1. AD SLOT: MAIN BANNER SLIDER */}
        <div className="slider-container">
            <Slider {...sliderSettings}>
            {sliderItems.map((item) => (
                <div key={item.id} className="unique-slider-item">
                <img src={item.img} alt={item.alt} className="hero-image" />
                <div className="hero-content-overlay">
                    <p className="hero-tagline">✨TOP BRANDS</p>
                    <h2 className="hero-title">{item.alt.toUpperCase().replace("BANNER", "DEALS")}</h2>
                    <a href="#products" className="hero-cta-button">SHOP THE COLLECTION</a>
                </div>
                </div>
            ))}
            </Slider>
        </div>
        
        {/* 2. AD SLOT: FEATURED PRODUCTS CAROUSEL */}
        <div id="products" className="product-carousel-container">
            <h3 style={{ textAlign: 'center', margin: '1px 0 1px 0', color: '#8b0000' }}>
            🔥 Our Top Featured Products 🔥
            </h3>
            <Slider {...productSliderSettings}>
            {products.map((product) => (
                <div key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
                </div>
            ))}
            </Slider>
        </div>
        
        {/* 3. AD SLOT: TRENDING / SPLIT-SCREEN SLIDER */}
        <div className="trending-slider-section">
            <h3 style={{ textAlign: 'center', margin: '40px 0 20px 0', color: '#6a1b9a' }}>
                ✨ TRENDING NOW: Hot Deals You Can't Miss! ✨
            </h3>
            <div className="special-slick-wrapper">
                <Slider {...specialSliderSettings}>
                    {trendingProducts.map((item) => (
                        <div key={item.id} className="trending-slide-item">
                            <div className="trending-card" style={{ backgroundColor: item.color }}>
                                <img src={item.img} alt={item.name} className="trending-img" />
                                <div className="trending-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.details}</p>
                                    <button className="trending-cta">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    </>
  );
};

export default HomeContent;