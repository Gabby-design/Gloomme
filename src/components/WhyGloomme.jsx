import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { whyGloommeBullets } from '../data/mockData';

export default function WhyGloomme() {
  return (
    <section id="about" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div className="why-grid">
          {/* Left Image Column */}
          <div className="why-img-box">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
              alt="Business networking experts collaborating" 
            />

            <div className="floating-trust-badge">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200, 150, 62, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="#E6B966" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-white)' }}>Trusted by 3,200+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>verified businesses</div>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div>
            <p style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Why Gloomme
            </p>

            <h2 style={{ fontSize: '2.8rem', marginBottom: '1.25rem', lineHeight: '1.25' }}>
              Built for professionals who want <span className="text-gradient">real results</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Most networking platforms are full of noise — random connection requests, spam messages, and zero real opportunity. Gloomme is different. We verify every business, match you with relevant professionals, and focus on creating outcomes, not just contact lists.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {whyGloommeBullets.map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} color="#E6B966" style={{ flexShrink: 0 }} />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
              <span>Learn About Our Mission</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
