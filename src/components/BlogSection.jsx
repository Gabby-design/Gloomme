import React from 'react';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/mockData';

export default function BlogSection() {
  return (
    <section id="blog" className="section-padding" style={{ background: 'rgba(6, 11, 25, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Resources & Insights</div>
          <h2 className="section-title">
            Latest from the <span className="gold-gradient-text">Gloomme Knowledge Hub</span>
          </h2>
          <p className="section-subtitle">
            Actionable strategies on networking, remote work trends, and cross-border business growth.
          </p>
        </div>

        <div className="jobs-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{post.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{post.snippet}</p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>By {post.author}</span>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                    <span>Read Article</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
