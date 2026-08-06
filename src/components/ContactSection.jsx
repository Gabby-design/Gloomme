import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactSection({ onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onToast(`Thank you, ${formData.name}! Your message has been sent to the Gloomme team. We will respond within 24 hours.`);
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28, 37, 65, 0.2), transparent, rgba(28, 37, 65, 0.2))' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <p style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Get in Touch
          </p>
          <h2 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
            Ready to <span className="text-gradient">grow your network</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Fill out the form below and our team will get back to you within 24 hours. Whether you're a professional looking for opportunities or a business seeking talent — we're here to help.
          </p>
        </div>

        <div className="contact-card-wrap">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-white)' }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="form-input-styled" 
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-white)' }}>
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="form-input-styled" 
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-white)' }}>
                Phone Number
              </label>
              <input 
                type="tel" 
                className="form-input-styled" 
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-white)' }}>
                I'm interested in
              </label>
              <select 
                className="form-select-styled"
                required
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              >
                <option value="">Select an option</option>
                <option value="networking">Business Networking</option>
                <option value="opportunities">Remote Opportunities</option>
                <option value="membership">Membership Plans</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-white)' }}>
                Message
              </label>
              <textarea 
                className="form-textarea-styled" 
                rows={4}
                placeholder="Tell us about yourself and what you're looking for..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
              <span>Send Message</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
