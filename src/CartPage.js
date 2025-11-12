// CartPage.js
import React from 'react';
import { Link } from 'react-router-dom'; 

const CartPage = ({ cart, removeFromCart, addToCart }) => {
    
    // --- 1. SAFE CALCULATION LOGIC (Fixes the NaN issue) ---
    const cartTotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price); 
        const quantity = parseInt(item.quantity) || 0; 
        const itemSubtotal = price * quantity;
        return total + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
    }, 0);
    
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
    };

    return (
        <div className="cart-page-container">
            <h1>🛒 Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Your cart is currently empty. Start shopping now!</p>
                    <Link to="/" className="back-to-shop-button">
                        Back to Products
                    </Link>
                </div>
            ) : (
                <div className="cart-content-grid">
                    
                    {/* LEFT COLUMN: Item List */}
                    <div className="cart-item-list">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-page-item">
                                <img src={item.img} alt={item.name} className="cart-page-img" />
                                
                                <div className="item-details-main">
                                    <h3>{item.name}</h3>
                                    <p className="item-unit-price">Unit Price: {formatPrice(item.price)}</p>
                                    
                                    {/* QUANTITY CONTROLS */}
                                    <div className="quantity-controls">
                                        <button 
                                            // DECREMENTS quantity (or removes if quantity is 1)
                                            onClick={() => removeFromCart(item.id)} 
                                            className="quantity-btn remove-one-btn"
                                        >
                                            -
                                        </button>
                                        <span className="item-quantity-display">{item.quantity}</span>
                                        <button 
                                            // INCREMENTS quantity 
                                            onClick={() => addToCart(item)} 
                                            className="quantity-btn add-one-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Item Subtotal */}
                                <span className="item-subtotal">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Summary and Checkout */}
                    <div className="cart-summary-panel">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal ({cartCount} total items):</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping & Handling:</span>
                            <span>{formatPrice(500)}</span> {/* Example fixed fee */}
                        </div>
                        <hr />
                        <div className="summary-row total-amount">
                            <span>Order Total:</span>
                            <span>{formatPrice(cartTotal + 500)}</span>
                        </div>
                        
                        <h3>Payment Mode</h3>
                        <p>Options like Credit Card, UPI, and Cash on Delivery will be implemented here.</p>

                        {/* Link to the new Checkout Page */}
                        <Link to="/checkout" className="checkout-page-btn">
                            Proceed to Payment
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;