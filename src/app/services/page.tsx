"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

const services = [
  { 
    id: "wallpapers", 
    name: "WALLPAPERS", 
    desc: "TRANSFORM WALLS WITH STUNNING DESIGNS & TEXTURES", 
    btnText: "VIEW DESIGNS",
    img: "/images/service_wallpapers.png" 
  },
  { 
    id: "curtains", 
    name: "CURTAINS", 
    desc: "ELEVATE WINDOWS WITH LUXURIOUS FABRICS & STYLES", 
    btnText: "EXPLORE FABRICS",
    img: "/images/service_curtains.png" 
  },
  { 
    id: "blinds", 
    name: "BLINDS", 
    desc: "STYLE & FUNCTIONALITY WITH PREMIUM CUSTOM BLINDS", 
    btnText: "SHOP BLINDS",
    img: "/images/service_blinds.png" 
  },
  { 
    id: "flooring", 
    name: "FLOORING", 
    desc: "DURABLE & BEAUTIFUL FLOORS FOR EVERY SPACE", 
    btnText: "VIEW OPTIONS",
    img: "/images/service_flooring.png" 
  },
  { 
    id: "sofas", 
    name: "SOFAS", 
    desc: "HANDCRAFTED FURNITURE FOR COMFORT & STYLE", 
    btnText: "BROWSE COLLECTION",
    img: "/images/service_sofas.png" 
  },
  { 
    id: "cot", 
    name: "COT", 
    desc: "BESPOKE BEDS FOR ULTIMATE RELAXATION & LUXURY", 
    btnText: "BROWSE COLLECTION",
    img: "/images/service_cot.png" 
  },
];

export default function ServicesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <main className="services-carousel-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .services-carousel-main {
          min-height: 100vh;
          background-color: #FAF9F6; /* Light cream background matching the image */
          padding: 6rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .carousel-header {
          text-align: center;
          margin-bottom: 4rem;
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
          margin-bottom: 2rem;
          margin-left: 5%;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .carousel-label {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #333;
          display: block;
          margin-bottom: 1rem;
        }

        .carousel-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.2;
          max-width: 800px;
          margin: 0 auto;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 1600px;
          display: flex;
          align-items: center;
        }

        .nav-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #333;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          z-index: 10;
        }

        .nav-btn:hover {
          transform: scale(1.2);
        }

        .cards-scroll-area {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 1rem;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        .cards-scroll-area::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          flex: 0 0 320px;
          background: transparent;
          border: 1px solid #333;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-sizing: border-box;
        }

        .service-card * {
          box-sizing: border-box;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .card-image-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          position: relative;
          border-bottom: 1px solid #333;
          padding: 1rem;
        }

        .card-image-inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .card-image-inner img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .service-card:hover .card-image-inner img {
          transform: scale(1.05);
        }

        .card-content {
          padding: 2rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
        }

        .card-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #1A1A1A;
          margin-bottom: 1rem;
        }

        .card-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 11px;
          line-height: 1.6;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 2rem;
          min-height: 35px;
        }

        .card-btn {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 600;
          color: #333;
          background-color: #E6E1D6; /* Beige button color */
          border: 1px solid #333;
          padding: 0.75rem 1.5rem;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .service-card:hover .card-btn {
          background-color: #333;
          color: #FAF9F6;
        }

        .carousel-footer {
          margin-top: 5rem;
          text-align: center;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          letter-spacing: 0.05em;
          color: #333;
        }

        .carousel-footer a {
          color: #333;
          text-decoration: underline;
          font-weight: 600;
        }
      `}} />

      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> BACK TO HOME
      </Link>

      <div className="carousel-header">
        <span className="carousel-label">OUR SERVICES</span>
        <h1 className="carousel-title">
          Discover Exceptional Interiors:<br/>
          Explore Our Premium Collection
        </h1>
      </div>

      <div className="carousel-container">
        <button className="nav-btn" onClick={scrollLeft} aria-label="Scroll left">
          <ChevronLeft size={40} strokeWidth={1} />
        </button>

        <div className="cards-scroll-area" ref={scrollContainerRef}>
          {services.map((service) => (
            <Link href={`/services/${service.id}`} key={service.id} className="service-card">
              <div className="card-image-wrap">
                <div className="card-image-inner">
                  <Image src={service.img} alt={service.name} fill sizes="320px" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="card-title">{service.name}</h2>
                <p className="card-desc">{service.desc}</p>
                <div className="card-btn">{service.btnText}</div>
              </div>
            </Link>
          ))}
        </div>

        <button className="nav-btn" onClick={scrollRight} aria-label="Scroll right">
          <ChevronRight size={40} strokeWidth={1} />
        </button>
      </div>

      <div className="carousel-footer">
        READY TO TRANSFORM YOUR SPACE? <Link href="/contact">REQUEST A QUOTE</Link>
      </div>
    </main>
  );
}
