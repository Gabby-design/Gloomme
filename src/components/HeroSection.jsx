import React from 'react';
import { ArrowRight, CheckCircle2, Users, Briefcase, Globe, ShieldCheck } from 'lucide-react';
import { companyInfo, heroBadges } from '../data/mockData';

export default function HeroSection({ onOpenAuthModal }) {
  return (
    <>
      <section id="home" className="hero-wrapper">
        <div className="hero-bg-overlay"></div>
        <div className="hero-dot-grid"></div>
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="ping-dot">
                <span className="ping-dot-pulse"></span>
                <span className="ping-dot-solid"></span>
              </span>
              <span>Join 15,000+ professionals already in the network</span>
            </div>

            <h1 className="hero-title">
              Connecting <span className="text-gradient">Businesses</span>, <br />
              Creating <span className="text-gradient">Opportunities</span>
            </h1>

            <p className="hero-subtitle">
              The professional network built for real results. Connect with decision-makers, discover remote opportunities, and grow your business through meaningful relationships — not just another handshake.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button 
                className="btn-primary" 
                onClick={() => onOpenAuthModal('signup')}
                style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
              >
                <span>Join Our Network</span>
                <ArrowRight size={18} />
              </button>

              <a href="#how-it-works" className="btn-secondary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                <span>See How It Works</span>
              </a>
            </div>

            <div className="hero-checkmarks">
              {heroBadges.map((item, idx) => (
                <div key={idx} className="checkmark-item">
                  <CheckCircle2 size={16} color="#E6B966" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Counter Grid */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <Users size={28} className="stat-icon" />
              <div className="stat-value text-gradient">{companyInfo.stats.membersCount}</div>
              <div className="stat-label">Active Members</div>
            </div>

            <div className="stat-card">
              <Briefcase size={28} className="stat-icon" />
              <div className="stat-value text-gradient">{companyInfo.stats.businessesConnected}</div>
              <div className="stat-label">Businesses Connected</div>
            </div>

            <div className="stat-card">
              <Globe size={28} className="stat-icon" />
              <div className="stat-value text-gradient">{companyInfo.stats.remotePlacements}</div>
              <div className="stat-label">Remote Placements</div>
            </div>

            <div className="stat-card">
              <ShieldCheck size={28} className="stat-icon" />
              <div className="stat-value text-gradient">{companyInfo.stats.successRate}</div>
              <div className="stat-label">Connection Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
