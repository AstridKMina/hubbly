export const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
    
                <div className="footer-logo">
                    <p> 🤩 &copy; {new Date().getFullYear()} Hubbly. All rights reserved.</p>
                </div>

                <nav className="footer-nav">
                    <a href="#">About Us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="footer-socials">
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
    );
};