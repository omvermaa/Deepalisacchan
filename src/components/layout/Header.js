import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Dietician Deepali<span className="text-slate-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</Link>
          <Link 
            href="/consultation" 
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 hover:shadow-md transition-all active:scale-95 text-sm"
          >
            Get Custom Diet Plan
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
