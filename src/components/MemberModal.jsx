import React, { useState } from 'react';
import { X, UserCheck, Building2, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function MemberModal({ mode, onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState(mode || 'signup'); // 'signup' | 'login'
  const [role, setRole] = useState('individual'); // 'individual' | 'business'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    headline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionText = activeTab === 'signup' ? 'Registered Account' : 'Logged In';
    onAuthSuccess(`${actionText} successfully as ${formData.email || 'Member'}! Welcome to ${companyInfo.shortName}.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div className="nav-logo-badge" style={{ margin: '0 auto 0.75rem auto', width: '50px', height: '50px', fontSize: '1.4rem' }}>G</div>
          <h3 style={{ fontSize: '1.6rem' }}>
            {activeTab === 'signup' ? 'Join Gloomme Network' : 'Welcome Back'}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {activeTab === 'signup' 
              ? 'Connect with verified businesses and global remote opportunities'
              : 'Sign in to access your connections, messages, and saved jobs'}
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <button 
            style={{ flex: 1, padding: '0.5rem', border: 'none', background: activeTab === 'signup' ? 'var(--color-gold)' : 'none', color: activeTab === 'signup' ? '#060B19' : 'var(--text-muted)', fontWeight: 700, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
            onClick={() => setActiveTab('signup')}
          >
            Create Account
          </button>
          <button 
            style={{ flex: 1, padding: '0.5rem', border: 'none', background: activeTab === 'login' ? 'var(--color-gold)' : 'none', color: activeTab === 'login' ? '#060B19' : 'var(--text-muted)', fontWeight: 700, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <>
              {/* Role Picker */}
              <div className="form-group">
                <label>Account Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: role === 'individual' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                      background: role === 'individual' ? 'rgba(244, 196, 48, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: role === 'individual' ? 'var(--color-gold)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'center',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => setRole('individual')}
                  >
                    <User size={18} /> Professional
                  </button>

                  <button
                    type="button"
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: role === 'business' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                      background: role === 'business' ? 'rgba(244, 196, 48, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: role === 'business' ? 'var(--color-gold)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'center',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => setRole('business')}
                  >
                    <Building2 size={18} /> Business Entity
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>{role === 'business' ? 'Company Name' : 'Full Name'}</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder={role === 'business' ? 'e.g. Apex Innovations Ltd' : 'e.g. David Williams'}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {role === 'individual' ? (
                <div className="form-group">
                  <label>Professional Title / Headline</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Senior Remote React Engineer"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label>Business Industry</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. FinTech / Logistics / SaaS"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="you@domain.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }}>
            <span>{activeTab === 'signup' ? 'Complete Verification & Join' : 'Sign In To Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
