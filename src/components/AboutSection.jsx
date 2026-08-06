import React from 'react';
import { Target, Compass, Award, Shield, Zap, HeartHandshake } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Shield size={24} />,
      title: "100% Verified Community",
      desc: "Every profile and enterprise listing undergoes thorough vetting to eliminate spam and guarantee authentic engagement."
    },
    {
      icon: <HeartHandshake size={24} />,
      title: "Direct Strategic Matchmaking",
      desc: "Connect directly with decision-makers, co-founders, and hiring directors without middleman delays."
    },
    {
      icon: <Zap size={24} />,
      title: "Remote First Growth",
      desc: "Curated access to global remote positions and international cross-border partnership projects."
    },
    {
      icon: <Award size={24} />,
      title: "Peer Executive Circles",
      desc: "Monthly masterclasses, leadership roundtables, and mentorship opportunities with industry pioneers."
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'rgba(6, 11, 25, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">About Gloomme</div>
          <h2 className="section-title">
            Redefining <span className="gold-gradient-text">Business Synergies</span> & Remote Collaboration
          </h2>
          <p className="section-subtitle">
            Gloomme Business Connections Limited was built on a single core belief: that high-value opportunities thrive when verified businesses and ambitious talent connect seamlessly.
          </p>
        </div>

        <div className="about-grid">
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(244, 196, 48, 0.15)', color: '#F4C430' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem' }}>Our Mission</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {companyInfo.mission}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00F2FE' }}>
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem' }}>Our Vision</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              {companyInfo.vision}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              Why Leading Professionals & Enterprises Choose <span className="gold-gradient-text">Gloomme</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Unlike generic professional networks polluted with unverified leads, Gloomme enforces strict trust standards, ensuring every conversation is productive, high-intent, and growth-focused.
            </p>

            <div className="about-features">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="about-feature-box">
                  <div className="about-feature-icon">{pillar.icon}</div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-white)' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
