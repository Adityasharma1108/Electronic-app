import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, isAdded }) => {
    
    // Style constants for the dynamic button
    const buttonStyle = {
        padding: '8px 15px',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s, transform 0.1s',
        width: '100%',
        textAlign: 'center',
    };

    const addedStyle = {
        ...buttonStyle,
        backgroundColor: '#388e3c', // Green for added
        color: 'white',
        textDecoration: 'none',
    };

    const addStyle = {
        ...buttonStyle,
        backgroundColor: '#fb641b', // Orange for action
        color: 'white',
    };

    // Helper to format currency (assuming INR)
    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
    };

    return (
        <div style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
        }}>
            <img 
                src={product.img} 
                alt={product.name} 
                style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxHeight: '150px',
                    objectFit: 'contain',
                    marginBottom: '10px' 
                }}
            />
            <h4 style={{ margin: '10px 0 5px 0', fontSize: '16px', color: '#333' }}>{product.name}</h4>
            <p style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold', color: '#fb641b' }}>
                {formatPrice(product.price)}
            </p>

            {/* DYNAMIC BUTTON LOGIC */}
            {isAdded ? (
                // If added, show "Go to Cart" button which links to the cart page
                <Link to="/cart" style={addedStyle}>
                    ✓ GO TO CART
                </Link>
            ) : (
                // If not added, show "Add to Cart" button which calls the function
                <button 
                    onClick={() => addToCart(product)} 
                    style={addStyle}
                >
                    ADD TO CART
                </button>
            )}
        </div>
    );
};

export default ProductCard;