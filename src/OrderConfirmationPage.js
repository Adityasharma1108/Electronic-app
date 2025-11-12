import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const styles = {
    container: {
        padding: '50px 20px',
        backgroundColor: '#f5f5f5',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
    },
    icon: {
        fontSize: '48px',
        color: '#388e3c', /* Green for success */
        marginBottom: '20px',
        display: 'inline-block',
        border: '3px solid #388e3c',
        borderRadius: '50%',
        padding: '10px 20px',
    },
    title: {
        color: '#333',
        fontSize: '28px',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#666',
        marginBottom: '30px',
        lineHeight: '1.5',
    },
    details: {
        textAlign: 'left',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        borderLeft: '5px solid #2874f0',
        marginBottom: '30px',
        fontSize: '15px',
    },
    orderId: {
        fontWeight: 'bold',
        color: '#2874f0',
    },
    total: {
        fontWeight: 'bold',
        color: '#fb641b',
    },
    homeLink: {
        backgroundColor: '#2874f0',
        color: 'white',
        padding: '12px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        display: 'inline-block',
        transition: 'background-color 0.3s',
    }
};

const OrderConfirmationPage = () => {
    // Retrieve data passed from the checkout page
    const location = useLocation();
    const { orderId, total, paymentMethod } = location.state || {}; 

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>
                    <span>✓</span>
                </div>
                <h1 style={styles.title}>Order Placed Successfully!</h1>
                <p style={styles.subtitle}>
                    Thank you for shopping with Harit's Electronic Shop. A confirmation will be sent to your email shortly.
                </p>
                
                <div style={styles.details}>
                    <p><strong>Order ID:</strong> <span style={styles.orderId}>{orderId || 'HRT-001234 (Example)'}</span></p>
                    <p><strong>Total Amount:</strong> <span style={styles.total}>{total || '₹1,45,500.00'}</span></p>
                    <p><strong>Payment Method:</strong> {paymentMethod || 'Cash on Delivery'}</p>
                    <p style={{marginTop: '15px', fontWeight: 'bold', color: '#333'}}>
                        Expected delivery in 3-5 business days.
                    </p>
                </div>
                
                <Link to="/" style={styles.homeLink}>
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;