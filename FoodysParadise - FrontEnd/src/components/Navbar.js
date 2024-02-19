import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.webp';
import './Navbar.css';

function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const hamburgerStyle = {
        transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)',
        transition: 'transform 0.3s ease-in-out',
    };

    const handleLinkClick = () => {
        if (window.innerWidth >= 768) {
            setMobileMenuOpen(isMobileMenuOpen);
        }
        if (window.innerWidth < 768) {
            setMobileMenuOpen(!isMobileMenuOpen);
        }
        // Use history to navigate and scroll to the top
        if (window.location.pathname === '/work') {
            navigate('/work');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="custom-font bg-white p-2 md:p-10 z-[50] font-fam-bold mx-auto fixed top-0 w-full">
            <div className="container mx-auto flex md:flex-row flex-col items-center">
                <div className="flex justify-between w-full">
                    <Link to="/">
                        <img src={Logo} alt="" className='h-[60px] md:h-20'/>
                    </Link>
                    <button
                        className="mt-[-5px] md:hidden text-2xl"
                        onClick={toggleMobileMenu}
                        style={hamburgerStyle}
                    >
                        ☰
                    </button>
                </div>
                {/* Mobile Menu Links */}
                <div className={`md:mt-4 text-xl md:text-lg text-center justify-center md:flex md:gap-2 items-center ${isMobileMenuOpen ? 'flex flex-col open' : 'hidden'}`}>
                    <Link to="/" className="no-underline underline-effect-pink hover:text-[#000000] mb-4 md:mr-2" onClick={handleLinkClick}>Home</Link>
                    <Link to="/search" className="no-underline underline-effect-pink hover:text-[#000000] mb-4 md:mr-2" onClick={handleLinkClick}>Search</Link>
                    <Link to="/fridge" className="no-underline underline-effect-pink hover:text-[#000000] mb-4 md:mr-2" onClick={handleLinkClick}>MyFridge</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
