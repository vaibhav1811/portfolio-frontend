import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleTheme, isDark }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: '/', type: 'route' },
        { name: 'Arsenal', to: '/arsenal', type: 'route' },
        { name: 'Timeline', to: '/timeline', type: 'route' },
        { name: 'Arcade', to: '/arcade', type: 'route' },
        { name: 'Signal_Log', to: '/blog', type: 'route' },
    ];

    return (
        <header className={`header ${scrolled ? 'scroll-header' : ''}`}>
            <nav className="nav container">
                <RouterLink to="/" className="nav__logo">
                    &lt;Vaibhav /&gt;
                </RouterLink>

                <div className={`nav__menu ${menuOpen ? 'show-menu' : ''}`}>
                    <ul className="nav__list">
                        {navLinks.map((link) => (
                            <li key={link.name} className="nav__item">
                                <RouterLink
                                    to={link.to}
                                    className={`nav__link ${location.pathname === link.to ? 'active-link' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </RouterLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="nav__btns">
                    {/* System Status Indicator */}
                    <div className="system-status">
                        <span className="status-dot"></span>
                        <span className="status-text">ONLINE</span>
                    </div>

                    {/* Theme Toggle Button */}
                    <div className="theme__toggle" onClick={toggleTheme}>
                        <i className={isDark ? 'ri-sun-line' : 'ri-moon-line'}></i>
                    </div>

                    <div className="nav__toggle" onClick={() => setMenuOpen(true)}>
                        <i className="ri-menu-line"></i>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
