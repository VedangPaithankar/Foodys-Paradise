import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.webp';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const NavLink = ({ to, onClick, children }) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`nav-link-underline no-underline font-medium mb-4 md:mb-0 md:mr-8 last:mr-0 ${isActive ? 'text-paprika active' : 'text-ink'}`}
        >
            {children}
        </Link>
    );
};

function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className="font-sans bg-paper/95 backdrop-blur-sm border-b border-sand px-4 py-3 md:px-10 md:py-4 z-50 fixed top-0 w-full">
            <div className="max-w-6xl mx-auto flex md:flex-row flex-col items-center">
                <div className="flex justify-between items-center w-full">
                    <Link to="/" className="flex items-center gap-3 no-underline" onClick={handleLinkClick}>
                        <img src={Logo} alt="Foodys Paradise" className="h-11 md:h-14" />
                        <span className="hidden sm:block font-display text-2xl md:text-3xl text-ink tracking-wide">
                            Foodys Paradise
                        </span>
                    </Link>
                    <button
                        className="md:hidden text-2xl text-ink transition-transform duration-300"
                        style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>
                <div
                    className={`w-full md:w-auto md:mt-0 mt-4 text-lg md:text-base md:flex md:items-center ${
                        isMobileMenuOpen ? 'flex flex-col items-start gap-1' : 'hidden'
                    }`}
                >
                    <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
                    <NavLink to="/search" onClick={handleLinkClick}>Search</NavLink>
                    <NavLink to="/fridge" onClick={handleLinkClick}>My Fridge</NavLink>
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/favorites" onClick={handleLinkClick}>Favorites</NavLink>
                            <button
                                onClick={handleLogout}
                                className="nav-link-underline text-ink-light font-medium bg-transparent border-0 cursor-pointer p-0 mb-4 md:mb-0"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={handleLinkClick}>Log in</NavLink>
                            <Link
                                to="/signup"
                                onClick={handleLinkClick}
                                className="no-underline bg-paprika hover:bg-paprika-dark text-white font-medium px-4 py-1.5 rounded-full transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
