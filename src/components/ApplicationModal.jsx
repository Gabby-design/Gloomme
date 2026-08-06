import React, { useState } from 'react';
import { X, Send, MapPin, DollarSign, Briefcase } from 'lucide-react';

export default function ApplicationModal({ job, onClose, onSubmitSuccess }) {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(`Application submitted successfully for ${job.title} at ${job.company}!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
          <span className="section-tag" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            {job.category}
          </span>
          <h3 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>{job.title}</h3>
          <div style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.95rem' }}>{job.company}</div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#00F2FE" /> {job.locationType}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <DollarSign size={14} color="#F4C430" /> {job.salary}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Alex Morgan"
              required
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="alex@example.com"
              required
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Portfolio / LinkedIn / CV Link</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://linkedin.com/in/yourprofile or portfolio"
              required
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Proposal / Cover Note</label>
            <textarea 
              className="form-textarea" 
              rows={4}
              placeholder="Highlight relevant experience or B2B synergy proposal..."
              required
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <span>Send Direct Proposal / Application</span>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
