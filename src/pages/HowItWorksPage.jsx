import React from 'react';
import { ArrowLeft, ArrowRight, Users, Briefcase, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { howItWorksSteps } from '../data/mockData';

export default function HowItWorksPage() {
  const iconMap = {
    1: <Users size={32} color="#E6B966" />,
    2: <Briefcase size={32} color="#E6B966" />,
    3: <Globe size={32} color="#E6B966" />,
    4: <CheckCircle2 size={32} color="#E6B966" />,
  };

  return (
    <div className="page-shell">
      <div className="container page-content">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>

        <div className="page-hero">
          <div className="section-tag">How it works</div>
          <h1 className="page-title">Simple, direct, and built for meaningful introductions.</h1>
          <p className="page-subtitle">
            We make it easy for professionals and businesses to connect around real opportunities, without the noise of generic networking platforms.
          </p>
        </div>

        <div className="testimonial-page-grid">
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="glass-card testimonial-page-card" style={{ textAlign: 'center' }}>
              <div className="step-card-circle" style={{ marginBottom: '1rem' }}>
                {iconMap[item.step]}
                <div className="step-badge-num">{item.step}</div>
              </div>

              <h3 style={{ marginBottom: '0.6rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ marginBottom: '0.3rem' }}>Ready to see it for yourself?</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Join the network and start building momentum with the right people.</p>
          </div>
          <a href="/" className="btn-primary">
            <span>Explore the platform</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
