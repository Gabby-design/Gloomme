import React, { useState } from 'react';
import { Check, Zap, Sparkles } from 'lucide-react';
import { pricingPlans } from '../data/mockData';

export default function PricingSection({ onOpenAuthModal }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [userType, setUserType] = useState('individual'); // 'individual' | 'business'

  const currentPlans = pricingPlans[userType];

  return (
    <section id="pricing" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Membership Tiers</div>
          <h2 className="section-title">
            Invest in Your <span className="gold-gradient-text">Growth & Global Reach</span>
          </h2>
          <p className="section-subtitle">
            Transparent, flexible plans tailored for individual remote job seekers, growing SMBs, and enterprise networks.
          </p>
        </div>

        {/* User Type & Billing Cycle Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(11, 19, 43, 0.8)', padding: '0.35rem', borderRadius: '999px', border: '1px solid var(--glass-border)', display: 'inline-flex' }}>
            <button 
              className={`btn btn-sm ${userType === 'individual' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUserType('individual')}
              style={{ borderRadius: '999px' }}
            >
              For Individuals & Remote Seekers
            </button>
            <button 
              className={`btn btn-sm ${userType === 'business' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUserType('business')}
              style={{ borderRadius: '999px' }}
            >
              For Businesses & Recruiters
            </button>
          </div>

          <div className="pricing-toggle">
            <span style={{ fontSize: '0.9rem', color: billingCycle === 'monthly' ? 'var(--text-white)' : 'var(--text-muted)' }}>Monthly</span>
            <div 
              className={`toggle-switch ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            >
              <div className="toggle-handle"></div>
            </div>
            <span style={{ fontSize: '0.9rem', color: billingCycle === 'annual' ? 'var(--text-white)' : 'var(--text-muted)' }}>
              Annual <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.75rem', background: 'rgba(244, 196, 48, 0.15)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {currentPlans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div key={idx} className={`glass-card pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '40px' }}>
                  {plan.tagline}
                </p>

                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gold-gradient-text">
                    ${price}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ month</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem' }}>
                      <Check size={18} color="#F4C430" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`btn btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onOpenAuthModal('signup')}
                >
                  <span>{plan.cta}</span>
                  <Sparkles size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
