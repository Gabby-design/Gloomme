import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Send, Briefcase, Filter, ShieldCheck, X, Bookmark, PlusCircle } from 'lucide-react';
import { jobListings } from '../data/mockData';

export default function OpportunitiesSection({ onSelectJob, onOpenAuthModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [savedJobs, setSavedJobs] = useState([]);

  const categories = ['All Categories', 'Engineering', 'Business Development', 'Design', 'HR & Recruitment', 'Executive Leadership'];
  const employmentTypes = ['All Types', 'Full-Time', 'Contract / Freelance', 'B2B Partnerships'];

  const filteredJobs = jobListings.filter((job) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      !term ||
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.skills.some(skill => skill.toLowerCase().includes(term));

    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory;
    const matchesType = selectedType === 'All Types' || job.employmentType === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <section id="opportunities" style={{ padding: '6rem 0', position: 'relative' }}>
      {/* Background Lighting Glows */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '350px', height: '350px', background: 'rgba(200, 150, 62, 0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '350px', height: '350px', background: 'rgba(0, 242, 254, 0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <p style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Match Directory
          </p>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            Discover High-Impact <span className="text-gradient">Remote Opportunities</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Hand-vetted remote positions, contract roles, and B2B partnership calls from top global companies and verified Gloomme members.
          </p>
        </div>

        {/* Directory Search & Filter Panel */}
        <div style={{
          background: 'rgba(11, 19, 43, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Top Row: Search Input & Type Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(3, 7, 18, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '0.7rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              flex: 1,
              minWidth: '280px'
            }}>
              <Search size={18} color="#C8963E" />
              <input 
                type="text" 
                placeholder="Search title, skill (e.g. React, FinTech), or company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-white)',
                  fontSize: '0.95rem',
                  width: '100%'
                }}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Employment Type Switcher Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {employmentTypes.map((type) => (
                <button
                  key={type}
                  className={`btn-secondary ${selectedType === type ? 'active-type' : ''}`}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.82rem',
                    borderRadius: 'var(--radius-full)',
                    background: selectedType === type ? 'var(--gold-400)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedType === type ? '#030712' : 'var(--text-muted)',
                    borderColor: selectedType === type ? 'var(--gold-400)' : 'rgba(255, 255, 255, 0.1)',
                    fontWeight: selectedType === type ? 700 : 500
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginRight: '0.5rem' }}>
              <Filter size={14} color="#C8963E" /> Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  border: selectedCategory === cat ? '1px solid var(--gold-400)' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedCategory === cat ? 'rgba(200, 150, 62, 0.15)' : 'rgba(255,255,255,0.03)',
                  color: selectedCategory === cat ? 'var(--gold-400)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing <strong style={{ color: 'var(--gold-400)' }}>{filteredJobs.length}</strong> active verified opportunities
          </span>

          {(searchTerm || selectedCategory !== 'All Categories' || selectedType !== 'All Types') && (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); setSelectedType('All Types'); }}
              style={{ background: 'none', border: 'none', color: 'var(--gold-400)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Opportunities Card Grid */}
        {filteredJobs.length === 0 ? (
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 1.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              No remote opportunities found matching your search filters.
            </p>
            <button 
              className="btn-secondary"
              onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); setSelectedType('All Types'); }}
            >
              Clear Search & View All Listings
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.75rem' }}>
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="service-card" 
                style={{ padding: '1.75rem', justifyContent: 'space-between', position: 'relative' }}
              >
                <div>
                  {/* Card Top: Logo, Company, Badges */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem'
                      }}>
                        {job.logo}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-400)' }}>
                            {job.company}
                          </span>
                          {job.verifiedEmployer && (
                            <ShieldCheck size={15} color="#00F2FE" title="Verified Gloomme Enterprise Member" />
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          {job.employmentType} • {job.category}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: savedJobs.includes(job.id) ? 'var(--gold-400)' : 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title={savedJobs.includes(job.id) ? "Saved" : "Save opportunity"}
                    >
                      <Bookmark size={20} fill={savedJobs.includes(job.id) ? "var(--gold-400)" : "none"} />
                    </button>
                  </div>

                  {/* Title & Badge */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: job.urgency === 'Urgent Hiring' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(200, 150, 62, 0.15)',
                        color: job.urgency === 'Urgent Hiring' ? '#F87171' : 'var(--gold-400)',
                        border: job.urgency === 'Urgent Hiring' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(200, 150, 62, 0.3)'
                      }}>
                        {job.urgency}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', lineHeight: '1.35', color: 'var(--text-white)' }}>
                      {job.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    {job.description}
                  </p>

                  {/* Key Metadata (Location & Compensation) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <MapPin size={15} color="#00F2FE" />
                      <span>{job.locationType}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-white)', fontWeight: 600 }}>
                      <DollarSign size={15} color="#C8963E" />
                      <span className="text-gradient">{job.salary}</span>
                    </div>
                  </div>

                  {/* Skills Tags (Clickable Filter) */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        onClick={() => setSearchTerm(skill)}
                        style={{
                          fontSize: '0.76rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-muted)',
                          padding: '0.2rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        title={`Click to filter by ${skill}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action Row */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {job.postedDate}
                  </span>

                  <button 
                    className="btn-primary"
                    onClick={() => onSelectJob(job)}
                    style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    <span>Apply Now</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Employer Banner CTA */}
        <div style={{
          marginTop: '4rem',
          background: 'linear-gradient(135deg, rgba(200, 150, 62, 0.1) 0%, rgba(11, 19, 43, 0.9) 100%)',
          border: '1px solid var(--card-border-hover)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <PlusCircle size={18} /> FOR ENTERPRISES & RECRUITERS
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-white)', marginBottom: '0.4rem' }}>
              Hiring remote talent or seeking B2B partners?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
              Post your open opportunities to Gloomme's network of 15,000+ verified professionals and business leaders worldwide.
            </p>
          </div>

          <button 
            className="btn-primary"
            onClick={() => onOpenAuthModal('signup')}
            style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
          >
            <span>Post an Opportunity</span>
            <PlusCircle size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
