import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageLayout({ children, onOpenAuthModal }) {
  return (
    <>
      <Navbar onOpenAuthModal={onOpenAuthModal} />
      <div className="page-shell">
        {children}
      </div>
      <Footer onOpenAuthModal={onOpenAuthModal} />
    </>
  );
}
