import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added Link import for Checkout button

// The Cart component receives the cart array and the function to remove items
const Cart = ({ cart, removeFromCart, addToCart }) => { // Added addToCart for completeness, although not used here
    // State to manage whether the cart dropdown is open or closed
    const [isCartOpen, setIsCartOpen] = useState(false); 
    
    // Toggle function
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Calculate the total number of items to display in the header
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Calculate the total price of all items
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Simple function to format currency
    const formatPrice = (price) => {
        // Ensure formatting includes the currency symbol automatically
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
    };

    return (
        <div className="cart-container">
            {/* Clickable Cart button/text in the header, uses toggle function */}
            <button className="cart-icon-button" onClick={toggleCart}>
                Cart ({cartCount})
            </button>

            {/* The dropdown is conditionally rendered based on isCartOpen state */}
            {isCartOpen && (
                <div className="cart-dropdown">
                    {cart.length === 0 ? (
                        <div className="empty-message">Your cart is empty.</div>
                    ) : (
                        <>
                            {/* List all items in the cart */}
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.img} alt={item.name} className="cart-item-img" />
                                    <div className="item-details">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">
                                            {/* Price calculation remains clean */}
                                            {formatPrice(item.price)} x {item.quantity} = 
                                            <span style={{ fontWeight: '600' }}> {formatPrice(item.price * item.quantity)}</span>
                                        </span>
                                    </div>
                                    <button 
                                        className="remove-button" 
                                        onClick={() => removeFromCart(item.id)} 
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="cart-summary">
                                <hr />
                                <div className="total-row">
                                    <span>Total:</span>
                                    {/* Price total remains clean */}
                                    <span style={{ fontWeight: 'bold' }}>{formatPrice(cartTotal)}</span>
                                </div>
                                
                                {/* Link to CartPage instead of Checkout Button */}
                                <Link to="/cart" className="checkout-button-link">
                                    <button className="checkout-button" onClick={toggleCart}>
                                        Proceed to Cart ({cartCount} Items)
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;