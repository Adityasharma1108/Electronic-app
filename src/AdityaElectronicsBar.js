// AdityaElectronicsBar.js
import React from 'react';

const FooterColumn = ({ title, links }) => (
    <div className="footer-col">
        <h4>{title}</h4>
        <ul>
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.url}>{link.text}</a>
                </li>
            ))}
        </ul>
    </div>
);

const AdityaElectronicsBar = () => {
    // Define the data for the four columns
    const footerData = [
        {
            title: "Get to Know Us",
            links: [
                { text: "About Harit's Shop", url: "#" },
                { text: "Careers", url: "#" },
                { text: "Press Releases", url: "#" },
                { text: "Shop Science", url: "#" },
            ],
        },
        {
            title: "Connect with Us",
            links: [
                { text: "Facebook", url: "#" },
                { text: "Twitter", url: "#" },
                { text: "Instagram", url: "#" },
                { text: "Email Support", url: "#" },
            ],
        },
        {
            title: "Sell & Partner",
            links: [
                { text: "Sell on Our Platform", url: "#" },
                { text: "Affiliate Program", url: "#" },
                { text: "Advertise Your Products", url: "#" },
                { text: "Supplier Registration", url: "#" },
            ],
        },
        {
            title: "Let Us Help You",
            links: [
                { text: "Your Account", url: "/account" },
                { text: "Returns Centre", url: "/returns" },
                { text: "Recalls & Alerts", url: "#" },
                { text: "100% Purchase Protection", url: "#" },
                { text: "Help", url: "/help" },
            ],
        },
    ];

    return (
        <footer className="footer-main">
            <div className="footer-content-container">
                {footerData.map((col, index) => (
                    <FooterColumn key={index} title={col.title} links={col.links} />
                ))}
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Harit's Electronic Shop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default AdityaElectronicsBar;