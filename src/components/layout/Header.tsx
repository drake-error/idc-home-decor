import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-lightGrey bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-orange text-white flex items-center justify-center font-serif font-bold text-2xl">
            d
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-wider text-brand-dark leading-tight">IDC</span>
            <span className="text-[10px] tracking-[0.2em] text-brand-grey font-medium uppercase">Home Decor</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-sm text-brand-dark">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-brand-orange transition-colors">Services</Link>
          <Link href="/portfolio" className="hover:text-brand-orange transition-colors">Portfolio</Link>
          <Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-brand-dark hover:text-brand-orange transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/book" className="hidden md:inline-flex items-center justify-center px-8 py-3 bg-brand-dark text-white font-medium text-sm hover:bg-brand-orange transition-colors">
            Book Consultation
          </Link>
          <button className="md:hidden text-brand-dark">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
