// CheckoutPage.js
import React, { useState, useMemo } from 'react';
// 1. IMPORT USE-NAVIGATE
import { useNavigate } from 'react-router-dom'; 

// --- Component for Rendering a Step Card (Remains the same) ---
const StepCard = ({ number, title, status, children }) => (
    <div className={`step-card ${status}`}>
        <div className="step-header">
            <span className="step-number">{status === 'completed' ? '✓' : number}</span>
            <span className="step-title">{title}</span>
        </div>
        <div className="step-content">
            {children}
        </div>
    </div>
);

// --- Main Checkout Page Component ---
const CheckoutPage = ({ cart }) => {
    // 2. INITIALIZE NAVIGATE HOOK
    const navigate = useNavigate();
    
    const [shippingAddress, setShippingAddress] = useState(null);
    const [isEditingAddress, setIsEditingAddress] = useState(true);
    const [addressInput, setAddressInput] = useState({ name: '', street: '', city: '', zip: '' });
    
    // Determine the active step for visual styling: 1=Address, 2=Payment
    const activeStep = shippingAddress && !isEditingAddress ? 2 : 1; 

    const shippingCost = 500;
    
    // Total Calculations (remain the same)
    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price); 
            const quantity = parseInt(item.quantity) || 0; 
            const itemSubtotal = price * quantity;
            return total + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
        }, 0);
    }, [cart]);
    
    const grandTotal = cartTotal + shippingCost;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
    };

    // --- Address Handlers (remain the same) ---
    const handleInputChange = (e) => {
        setAddressInput({ ...addressInput, [e.target.id]: e.target.value });
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        
        if (!addressInput.name || !addressInput.street || !addressInput.city || !addressInput.zip) {
            alert('Please fill out all address fields.');
            return;
        }

        setShippingAddress(addressInput);
        setIsEditingAddress(false);
    };
    
    // --- Render Functions (remain the same) ---
    const renderAddressForm = () => (
        <form onSubmit={handleSaveAddress} className="address-form">
            <input type="text" id="name" placeholder="Name" value={addressInput.name} onChange={handleInputChange} required /><br />
            <input type="text" id="street" placeholder="Street Address" value={addressInput.street} onChange={handleInputChange} required /><br />
            <input type="text" id="city" placeholder="City" value={addressInput.city} onChange={handleInputChange} required /><br />
            <input type="text" id="zip" placeholder="ZIP/Pin Code" value={addressInput.zip} onChange={handleInputChange} required /><br />
            
            <button type="submit" className="btn-deliver">
                DELIVER HERE
            </button>
        </form>
    );

    const renderAddressDisplay = () => (
        <div className="address-display-block">
            <span className="address-type">HOME</span>
            <p>{shippingAddress.name} | {shippingAddress.street}, {shippingAddress.city} - {shippingAddress.zip}</p>
            <button onClick={() => setIsEditingAddress(true)} className="btn-change-address">
                CHANGE
            </button>
        </div>
    );
    
    // 🎯 UPDATED Handler for the final order placement
    const handlePlaceOrder = () => {
        if (!shippingAddress) {
            alert('Please save your shipping address first.');
            return;
        }

        // 1. **Finalize Order (Simulated API Call)**
        console.log("Order submitted via COD.");
        
        // 2. **Navigate to Confirmation Page**
        // Pass necessary data (like the total) via state for the confirmation page
        navigate('/order-placed', { 
            state: { 
                orderId: 'HRT-001234', // Example ID
                total: formatPrice(grandTotal),
                paymentMethod: 'Cash on Delivery'
            }
        });
    };

    return (
        <div className="checkout-container">
            
            {/* LEFT COLUMN: Steps */}
            <div className="checkout-steps">
                
                {/* 1. DELIVERY ADDRESS STEP */}
                <StepCard 
                    number={1} 
                    title="DELIVERY ADDRESS" 
                    status={activeStep === 1 || isEditingAddress ? 'active' : 'completed'}
                >
                    {isEditingAddress || !shippingAddress ? renderAddressForm() : renderAddressDisplay()}
                    
                    {shippingAddress && !isEditingAddress && (
                         <div style={{ marginTop: '20px' }}>
                             <button onClick={() => setIsEditingAddress(false)} className="btn-continue-to-payment">
                                 CONTINUE TO PAYMENT
                             </button>
                         </div>
                    )}
                </StepCard>

                {/* 2. MODE OF PAYMENT STEP (COD Only) */}
                <StepCard 
                    number={2} 
                    title="MODE OF PAYMENT" 
                    status={activeStep === 2 ? 'active' : (activeStep < 2 ? 'pending' : 'completed')}
                >
                    <div className="payment-options" style={{ pointerEvents: activeStep === 2 ? 'auto' : 'none', opacity: activeStep === 2 ? 1 : 0.5 }}>
                        
                        {/* 💰 Cash on Delivery (COD) is the ONLY option */}
                        <div className="payment-choice">
                            <label>
                                <input type="radio" name="payment" value="cod" defaultChecked /> 
                                Cash on Delivery (COD)
                            </label>
                        </div>
                        
                        <div style={{ marginTop: '20px' }}>
                            {/* Final PLACE ORDER button calls the navigation handler */}
                            <button 
                                onClick={handlePlaceOrder} 
                                className="btn-place-order" 
                                style={{ 
                                    backgroundColor: '#fb641b', 
                                    color: 'white', 
                                    padding: '12px 25px', 
                                    border: 'none', 
                                    fontSize: '14px',
                                    fontWeight: 'bold', 
                                    cursor: 'pointer'
                                }}
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </StepCard>
            </div>

            {/* RIGHT COLUMN: Price Details Summary (Remains the same) */}
            <div className="price-details-panel">
                <h3>PRICE DETAILS ({cartCount} Items)</h3>
                <hr style={{ border: '1px solid #f0f0f0' }}/>
                
                <div className="price-row"><span>Items Total:</span><span>{formatPrice(cartTotal)}</span></div>
                <div className="price-row"><span>Shipping:</span><span style={{ color: '#388e3c' }}>{formatPrice(shippingCost)}</span></div>
                <div className="price-row"><span>Protect Promise Fee:</span><span>{formatPrice(0)}</span></div>
                
                <hr style={{ border: '1px dashed #e0e0e0' }}/>
                
                <div className="price-row total-amount">
                    <span>Total Payable:</span>
                    <span>{formatPrice(grandTotal)}</span>
                </div>
                
                <div className="secure-payments-note">
                    <i className="shield-icon">🔒</i>
                    <span>Safe and Secure Payments.</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;