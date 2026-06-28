import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-orange text-white flex items-center justify-center font-serif font-bold text-2xl">
              d
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-wider text-white leading-tight">IDC</span>
              <span className="text-[10px] tracking-[0.2em] text-gray-400 font-medium uppercase">Home Decor</span>
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium luxury interior design company creating bespoke spaces that tell your story.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif font-semibold text-lg mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-brand-orange transition-colors">Our Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-brand-orange transition-colors">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-lg mb-6">Services</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link href="/services/wallpapers" className="hover:text-brand-orange transition-colors">Wallpapers</Link></li>
            <li><Link href="/services/curtains" className="hover:text-brand-orange transition-colors">Curtains & Blinds</Link></li>
            <li><Link href="/services/flooring" className="hover:text-brand-orange transition-colors">Flooring</Link></li>
            <li><Link href="/services/sofas" className="hover:text-brand-orange transition-colors">Custom Sofas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-lg mb-6">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li>Email: info@idchomedecor.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Luxury Avenue, Design District</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} IDC Home Decor. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
