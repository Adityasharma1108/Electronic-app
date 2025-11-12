import React from "react";
import { Link } from 'react-router-dom';

// The ProductCard component now accepts the 'isAdded' prop
function ProductCard({ product, addToCart, isAdded }) {
    
    // Helper to format currency (assuming INR)
    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
    };

    // Base style for the button
    const baseButtonStyle = {
        padding: '10px 15px',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s',
        width: '100%',
        marginTop: '10px',
        textAlign: 'center',
        textDecoration: 'none', // For the Link component
        display: 'block' // Ensure Link takes up full width
    };

    // Styles for the two states
    const addStyle = {
        ...baseButtonStyle,
        backgroundColor: '#fb641b', // Orange for action
        color: 'white',
    };

    const addedStyle = {
        ...baseButtonStyle,
        backgroundColor: '#388e3c', // Green for confirmed
        color: 'white',
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
                <img src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price)}</p>
            </div>
            
            {/* Conditional Button Rendering */}
            {isAdded ? (
                // State 1: Item is in cart -> Show Go to Cart link
                <Link 
                    to="/cart" 
                    style={addedStyle} 
                    className="go-to-cart-btn"
                >
                    ✓ GO TO CART
                </Link>
            ) : (
                // State 2: Item is NOT in cart -> Show Add to Cart button
                <button 
                    className="add-btn" 
                    onClick={() => addToCart(product)}
                    style={addStyle}
                >
                    ADD TO CART
                </button>
            )}
        </div>
    );
}

export default ProductCard;