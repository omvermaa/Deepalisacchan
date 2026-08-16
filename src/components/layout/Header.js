'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2">
          <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Dietician Deepali<span className="text-slate-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</Link>
          <Link href="/blogs" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Blog</Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</Link>
          <Link 
            href="/consultation" 
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 hover:shadow-md transition-all active:scale-95 text-sm"
          >
            Get Custom Diet Plan
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          type="button"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-slate-700">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/blogs" 
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link 
                href="/consultation" 
                onClick={closeMobileMenu}
                className="block text-center bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all active:scale-95 text-sm shadow-sm"
              >
                Get Custom Diet Plan
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
