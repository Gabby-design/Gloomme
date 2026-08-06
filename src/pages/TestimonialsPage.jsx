import React from 'react';
import { ArrowLeft, Quote, Star } from 'lucide-react';
import { testimonials } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function TestimonialsPage() {
  return (
    <div className="page-shell">
      <div className="container page-content">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>

        <div className="page-hero">
          <div className="section-tag">Client stories</div>
          <h1 className="page-title">Trusted by founders, hiring teams, and professionals.</h1>
          <p className="page-subtitle">
            These testimonials reflect the kind of real conversations, introductions, and opportunities that happen when the right network comes together.
          </p>
        </div>

        <div className="testimonial-page-grid">
          {testimonials.map((item) => (
            <article key={item.id} className="glass-card testimonial-page-card">
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="#E6B966" color="#E6B966" />
                ))}
              </div>

              <div className="testimonial-quote-icon">
                <Quote size={18} />
              </div>

              <p className="testimonial-page-text">“{item.quote}”</p>

              <div className="testimonial-page-author">
                <img src={item.avatar} alt={item.name} className="testimonial-avatar-large" />
                <div>
                  <div className="testimonial-author-name">{item.name}</div>
                  <div className="testimonial-author-role">{item.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
