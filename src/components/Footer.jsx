import React from 'react';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function Footer({ onOpenAuthModal }) {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand & Contacts */}
          <div>
            <a href="/" className="logo-brand" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              <div className="logo-icon">G</div>
              <span className="logo-text">{companyInfo.shortName}</span>
            </a>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '340px' }}>
              Connecting professionals, businesses, and remote job seekers for collaboration and networking opportunities worldwide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#E6B966" />
                <span>{companyInfo.headquarters}</span>
              </div>
              <a href={`mailto:${companyInfo.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                <Mail size={16} color="#E6B966" />
                <span>{companyInfo.contactEmail}</span>
              </a>
              <a href={`tel:${companyInfo.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                <Phone size={16} color="#E6B966" />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/#how-it-works" className="nav-link">How It Works</a></li>
              <li><a href="/#services" className="nav-link">Services</a></li>
              <li><a href="/#opportunities" className="nav-link">Remote Opportunities</a></li>
              <li><a href="/#pricing" className="nav-link">Membership</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/#about" className="nav-link">About Us</a></li>
              <li><a href="/testimonials" className="nav-link">Testimonials</a></li>
              <li><a href="/#blog" className="nav-link">Blog</a></li>
              <li><a href="/#contact" className="nav-link">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#privacy" className="nav-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" className="nav-link" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* CTA Banner Row */}
        <div className="footer-banner-box">
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-white)' }}>Ready to grow your network?</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Join thousands of professionals already on Gloomme.</p>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => onOpenAuthModal('signup')}
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.5rem' }}
          >
            <span>Join Our Network</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Copyright Row */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Gloomme Business Connections Limited. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
