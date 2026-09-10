"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ConsultationForm from '@/components/consultation/ConsultationForm';

export default function ConsultationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenConsultationPopup');
    
    if (hasSeenPopup) return;

    const handleScroll = () => {
      // Show popup when scrolling past hero section (approx 600px or 80vh)
      // Getting window inner height to estimate 80% mark
      const scrollTriggerPt = window.innerHeight * 0.8;

      if (window.scrollY > scrollTriggerPt) {
        setShowPopup(true);
        // Remove listener once triggered
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll based on popup state
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('hasSeenConsultationPopup', 'true');
  };

  if (!hasMounted) return null;
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300 pointer-events-auto">
        <button 
          onClick={handleClose}
          className="absolute -top-12 right-0 md:-right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors border border-white/20"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <ConsultationForm />
      </div>
    </div>
  );
}
