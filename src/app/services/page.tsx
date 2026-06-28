import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    { id: "wallpapers", name: "Wallpapers", desc: "Customized Wallpapers & Catalogues", color: "bg-brand-lightGrey" },
    { id: "curtains", name: "Curtains", desc: "100% BlackOut, Main & Sheer", color: "bg-white border-gray-100" },
    { id: "blinds", name: "Blinds", desc: "Vertical, Zebra, Roller, Customize, Wooden, PVC, Roman", color: "bg-brand-lightGrey" },
    { id: "flooring", name: "Flooring", desc: "Wooden & Vinyl Floorings", color: "bg-white border-gray-100" },
    { id: "sofas", name: "Sofas", desc: "Customized Sofas", color: "bg-brand-lightGrey" },
    { id: "cot", name: "Cot", desc: "Customized Cots", color: "bg-white border-gray-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-20">
         <span className="text-brand-orange uppercase tracking-[0.3em] font-medium text-xs mb-4 block">Our Expertise</span>
         <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark mb-6">Services</h1>
         <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg">Explore our extensive range of interior design services, high-quality materials, and tailored solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link href={`/services/${service.id}`} key={service.id} className={`group block p-12 rounded-sm border ${service.color} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">{service.name}</h2>
              <p className="text-gray-500 font-sans mb-10 h-14 leading-relaxed text-sm">{service.desc}</p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:text-brand-orange transition-colors">
                Explore Categories <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 bg-brand-orange/5 rounded-full transform group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
