import React from 'react';
import { Users, Briefcase, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/mockData';

export default function HowItWorks() {
  const iconMap = {
    1: <Users size={32} color="#E6B966" />,
    2: <Briefcase size={32} color="#E6B966" />,
    3: <Globe size={32} color="#E6B966" />,
    4: <CheckCircle2 size={32} color="#E6B966" />
  };

  return (
    <section id="how-it-works" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(28, 37, 65, 0.2), transparent)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem auto' }}>
          <p style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Your Journey
          </p>
          <h2 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
            How <span className="text-gradient">Gloomme</span> Works
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Four simple steps to unlock your next big opportunity. No complicated onboarding, no endless forms — just real connections that move your career forward.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {howItWorksSteps.map((item) => (
            <div key={item.step} style={{ padding: '1rem' }}>
              <div className="step-card-circle">
                {iconMap[item.step]}
                <div className="step-badge-num">{item.step}</div>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a href="#about" className="btn-secondary">
            <span>Explore the full process</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
