import React from 'react';
import { ArrowRight, Briefcase, Compass, Sparkles, Users, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage({ onOpenAuthModal }) {
  const overviewCards = [
    {
      title: 'How It Works',
      description: 'See the simple path from profile to meaningful connections and opportunities.',
      href: '/how-it-works',
      icon: Compass,
    },
    {
      title: 'Services',
      description: 'Explore the platform services designed for networking, hiring, and growth.',
      href: '/services',
      icon: Briefcase,
    },
    {
      title: 'Remote Opportunities',
      description: 'Browse curated remote roles and partnership opportunities worth your attention.',
      href: '/opportunities',
      icon: Sparkles,
    },
    {
      title: 'Testimonials',
      description: 'Read the stories of people and teams already using the network successfully.',
      href: '/testimonials',
      icon: Users,
    },
  ];

  return (
    <>
      <Navbar onOpenAuthModal={onOpenAuthModal} />
      <main className="page-shell">
        <div className="container page-content">
          <div className="page-hero">
            <div className="section-tag">Gloomme overview</div>
            <h1 className="page-title">A modern, professional network for businesses and professionals.</h1>
            <p className="page-subtitle">
              Discover the platform through focused pages tailored to how people actually move from connection to opportunity.
            </p>
          </div>

          <div className="home-highlight-card glass-card">
            <div className="home-highlight-copy">
              <h3>Why members choose Gloomme</h3>
              <p>
                Gloomme combines verified networking, curated opportunities, and trusted introductions in one focused experience designed for product-led growth, remote hiring, and strategic partnerships.
              </p>
              <div className="home-benefit-list">
                <div className="home-benefit-item">
                  <ShieldCheck size={16} />
                  <span>Verified professionals and businesses</span>
                </div>
                <div className="home-benefit-item">
                  <Globe2 size={16} />
                  <span>Global reach with remote-first opportunities</span>
                </div>
                <div className="home-benefit-item">
                  <Users size={16} />
                  <span>Meaningful introductions instead of cold outreach</span>
                </div>
              </div>
            </div>
            <div className="home-highlight-stats">
              <div>
                <strong>15k+</strong>
                <span>active members</span>
              </div>
              <div>
                <strong>3.2k+</strong>
                <span>businesses connected</span>
              </div>
              <div>
                <strong>92%</strong>
                <span>success rate</span>
              </div>
            </div>
          </div>

          <div className="home-overview-grid">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} to={card.href} className="glass-card home-overview-card">
                  <div className="testimonial-quote-icon">
                    <Icon size={18} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="home-card-link">
                    Explore now
                    <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer onOpenAuthModal={onOpenAuthModal} />
    </>
  );
}
