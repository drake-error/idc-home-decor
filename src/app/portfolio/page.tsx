import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  const projects = [
    { id: 1, title: "The Azure Villa", category: "Living Spaces", image: "/images/project_living.jpg" },
    { id: 2, title: "The Heritage Estate", category: "Master Suites", image: "/images/project_bedroom.jpg" },
    { id: 3, title: "Lumina Penthouse", category: "Contemporary", image: "/images/hero_interior.jpg" },
    { id: 4, title: "Zen Garden Retreat", category: "Outdoor/Indoor", image: "/images/project_living.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-20 max-w-2xl mx-auto">
         <span className="text-brand-orange uppercase tracking-[0.3em] font-medium text-xs mb-4 block">Our Work</span>
         <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark mb-6">Portfolio</h1>
         <p className="text-gray-500 font-light text-lg">A curated showcase of our most prestigious and transformative interior design projects.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-16">
        {["All Projects", "Living Spaces", "Master Suites", "Commercial", "Contemporary"].map((filter, i) => (
           <button key={filter} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-brand-dark text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
             {filter}
           </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={project.id} className={`group relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-sm ${idx % 2 !== 0 ? "md:mt-16" : ""}`}>
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
              <div className="text-white">
                <span className="uppercase tracking-widest text-xs font-medium text-brand-orange mb-2 block">{project.category}</span>
                <h3 className="font-serif text-3xl font-bold">{project.title}</h3>
              </div>
              <button className="w-12 h-12 bg-brand-orange text-white flex items-center justify-center rounded-full transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-brand-orange text-white font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 rounded-sm">
           Start Your Project
        </Link>
      </div>
    </div>
  );
}
