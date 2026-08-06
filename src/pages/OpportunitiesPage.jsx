import React from 'react';
import { ArrowLeft, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobListings } from '../data/mockData';

export default function OpportunitiesPage() {
  return (
    <div className="container page-content">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>

      <div className="page-hero">
        <div className="section-tag">Remote opportunities</div>
        <h1 className="page-title">Discover opportunities that are both relevant and worthwhile.</h1>
        <p className="page-subtitle">
          Browse a curated view of remote roles and partnership opportunities designed for professionals who want momentum and clarity.
        </p>
      </div>

      <div className="testimonial-page-grid">
        {jobListings.map((job) => (
          <div key={job.id} className="glass-card testimonial-page-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                <Briefcase size={16} />
                <span>{job.title}</span>
              </div>
              <span className="section-tag" style={{ marginBottom: 0, padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>{job.employmentType}</span>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>{job.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <MapPin size={15} color="#E6B966" />
              <span>{job.locationType}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginBottom: '0.3rem' }}>Want to apply or explore more?</h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>The full experience on the home page includes the detailed application flow.</p>
        </div>
        <a href="/" className="btn-primary">
          <span>Back to overview</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
