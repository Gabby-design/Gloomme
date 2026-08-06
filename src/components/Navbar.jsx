import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function Navbar({ onOpenAuthModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Services', href: '/services' },
    { name: 'Remote Opportunities', href: '/opportunities' },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        <a href="/" className="logo-brand" aria-label="Gloomme Home">
          <div className="logo-icon">G</div>
          <span className="logo-text">{companyInfo.shortName}</span>
        </a>

        <nav className="hidden-mobile">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn-primary"
            onClick={() => onOpenAuthModal('signup')}
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}
          >
            <span>Join Our Network</span>
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Menu"
            style={{ display: 'none', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: '#030712',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 999
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem' }}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="btn-primary" 
            onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('signup'); }}
            style={{ marginTop: '0.5rem' }}
          >
            <span>Join Our Network</span>
          </button>
        </div>
      )}
    </header>
  );
}
