import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="section-padding" style={{ background: 'rgba(6, 11, 25, 0.5)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Client Reviews & Proof</div>
          <h2 className="section-title">
            Trusted by Professionals & <span className="gold-gradient-text">Global Business Leaders</span>
          </h2>
          <p className="section-subtitle">
            See how Gloomme Business Connections Limited has powered remote career breakthroughs and strategic B2B partnerships.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div className="stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F4C430" color="#F4C430" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(244, 196, 48, 0.1)', color: 'var(--color-gold)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>
                    {item.category}
                  </span>
                </div>

                <Quote size={24} color="rgba(244, 196, 48, 0.3)" style={{ marginBottom: '0.5rem' }} />

                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  "{item.text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-white)' }}>
                    <span>{item.name}</span>
                    {item.verified && <ShieldCheck size={16} color="#00F2FE" title="Verified Gloomme Member" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
