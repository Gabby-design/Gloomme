import React from 'react';
import { Briefcase, Globe, Users } from 'lucide-react';
import { services } from '../data/mockData';

export default function ServicesSection() {
  const iconMap = {
    Briefcase: <Briefcase size={28} color="#E6B966" />,
    Globe: <Globe size={28} color="#E6B966" />,
    Users: <Users size={28} color="#E6B966" />
  };

  return (
    <section id="services" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem auto' }}>
          <p style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            What We Offer
          </p>
          <h2 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
            More than just <span className="text-gradient">networking</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Gloomme is a complete ecosystem for professionals and businesses to connect, collaborate, and create lasting opportunities in the modern economy.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {services.map((item) => (
            <div key={item.id} className="service-card">
              <div className="service-img-wrap">
                <img src={item.image} alt={item.title} />
                <div className="service-img-overlay"></div>
                <div className="service-icon-floating">
                  {iconMap[item.icon] || <Briefcase size={28} color="#E6B966" />}
                </div>
              </div>

              <div className="service-body">
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
