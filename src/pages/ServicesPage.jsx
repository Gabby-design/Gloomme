import React from 'react';
import { ArrowLeft, ArrowRight, Briefcase, Sparkles, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      title: 'Talent Discovery',
      description: 'Connect with vetted professionals and remote specialists who fit your technical and business needs.',
      icon: Briefcase,
    },
    {
      title: 'Business Growth',
      description: 'Open doors to strategic partnerships, collaborations, and new opportunities across industries.',
      icon: Sparkles,
    },
    {
      title: 'Global Networking',
      description: 'Access a wider network of founders, operators, and decision-makers from around the world.',
      icon: Globe2,
    },
  ];

  return (
    <div className="container page-content">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>

      <div className="page-hero">
        <div className="section-tag">Services</div>
        <h1 className="page-title">Built to support growth, hiring, and meaningful connection.</h1>
        <p className="page-subtitle">
          Whether you’re recruiting, partnering, or building your network, the platform is designed to make the next step feel clear and intentional.
        </p>
      </div>

      <div className="testimonial-page-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="glass-card testimonial-page-card">
              <div className="testimonial-quote-icon">
                <Icon size={18} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginBottom: '0.3rem' }}>Looking for a tailored approach?</h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Explore the full experience and discover what fits your next move.</p>
        </div>
        <a href="/" className="btn-primary">
          <span>See the home page</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
