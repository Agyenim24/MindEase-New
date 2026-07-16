import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-surface-container-highest/50 py-lg px-margin-mobile md:px-margin-desktop border-t border-outline-variant/20 mt-auto shrink-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">MindEase</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 MindEase. Professional care for a modern world.</p>
        </div>
        <div className="flex gap-md">
          <Link to="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/resources" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Clinical Resources
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;