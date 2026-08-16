import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-slate-400 mb-6 md:mb-0 text-sm space-y-1">
          <p className="font-semibold text-slate-300">Dietician Deepali Sachan <span className="text-xs font-normal text-slate-400">(M.Sc Food Nutrition & Dietetics • 12+ Yrs Exp)</span></p>
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} All rights reserved. • Ph: <a href="tel:7607738761" className="hover:text-slate-300 transition-colors">+91 76077 38761</a> • Email: <a href="mailto:deepalisachan32@gmail.com" className="hover:text-slate-300 transition-colors">deepalisachan32@gmail.com</a></p>
        </div>
        <div className="flex space-x-8 text-sm">
          <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
          <Link href="/blogs" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
          <Link href="/consultation" className="text-slate-400 hover:text-white transition-colors">Book Consultation</Link>
        </div>
      </div>
    </footer>
  );
}
