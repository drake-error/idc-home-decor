"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const projectCategories = [
  { id: "wallpapers", name: "Wallpapers", img: "/images/service_wallpapers.jpeg" },
  { id: "curtains", name: "Curtains", img: "/images/luxury_curtains.png" },
  { id: "blinds", name: "Blinds", img: "/images/service_blinds.png" },
  { id: "flooring", name: "Flooring", img: "/images/service_flooring.jpeg" },
  { id: "sofas", name: "Sofa", img: "/images/service_sofas.jpeg" },
  { id: "cot", name: "Cot", img: "/images/service_cot.jpeg" }
];

export default function ProjectsPage() {
  return (
    <main className="projects-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .projects-main {
          min-height: 100vh;
          background: #FFFFFF;
          padding: 2rem 5rem 6rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-wrapper {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #FDFBF9 0%, #EBE2D5 100%);
          border-radius: 40px;
          padding: 4rem 4rem 5rem 4rem;
          margin-bottom: 2rem;
        }

        .hero-cutout {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 35%;
          height: 100px;
          background: #FFFFFF;
          border-bottom-right-radius: 60px;
          z-index: 0;
        }
        
        .hero-cutout::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -40px;
          width: 40px;
          height: 40px;
          background: transparent;
          border-bottom-left-radius: 40px;
          box-shadow: -20px 0 0 0 #FFFFFF;
        }

        .promo-banner {
          position: absolute;
          top: 0;
          right: 0;
          left: 35%; 
          height: 40px;
          background: #B38A36;
          border-top-right-radius: 40px;
          border-bottom-left-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.05em;
          z-index: 10;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          align-self: flex-start;
          margin-bottom: 3rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .projects-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .projects-label {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #333;
          display: block;
          margin-bottom: 1rem;
        }

        .projects-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.2;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/5;
          text-decoration: none;
        }

        .card-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .category-card:hover .card-img {
          transform: scale(1.08);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          color: #FFF;
          transition: background 0.3s ease;
        }

        .category-card:hover .card-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%);
        }

        .card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .card-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.8;
          transition: opacity 0.3s, transform 0.3s;
        }

        .category-card:hover .card-action {
          opacity: 1;
          transform: translateX(5px);
        }
      `}} />

      <div className="hero-wrapper">
        <div className="hero-cutout"></div>
        <div className="promo-banner">&quot;Transforming Spaces, Designing Life&quot;</div>
        
        <div className="hero-content">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
          
          <div className="projects-header">
            <span className="projects-label">OUR PORTFOLIO</span>
            <h1 className="projects-title">Explore Our Luxury Projects</h1>
          </div>
          
          <div className="categories-grid">
            {projectCategories.map((cat) => (
              <Link href={`/projects/${cat.id}`} key={cat.id} className="category-card">
                <Image src={cat.img} alt={cat.name} fill className="card-img" />
                <div className="card-overlay">
                  <h2 className="card-title">{cat.name}</h2>
                  <div className="card-action">View Projects <ArrowUpRight size={16} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
