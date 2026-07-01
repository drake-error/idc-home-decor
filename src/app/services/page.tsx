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
    img: "/images/service_wallpapers.jpeg" 
  },
  { 
    id: "curtains", 
    name: "CURTAINS", 
    desc: "ELEVATE WINDOWS WITH LUXURIOUS FABRICS & STYLES", 
    btnText: "EXPLORE FABRICS",
    img: "/images/service_curtains.jpeg" 
  },
  { 
    id: "blinds", 
    name: "BLINDS", 
    desc: "STYLE & FUNCTIONALITY WITH PREMIUM CUSTOM BLINDS", 
    btnText: "SHOP BLINDS",
    img: "/images/service_blinds.jpeg" 
  },
  { 
    id: "flooring", 
    name: "FLOORING", 
    desc: "DURABLE & BEAUTIFUL FLOORS FOR EVERY SPACE", 
    btnText: "VIEW OPTIONS",
    img: "/images/service_flooring.jpeg" 
  },
  { 
    id: "sofas", 
    name: "SOFAS", 
    desc: "HANDCRAFTED FURNITURE FOR COMFORT & STYLE", 
    btnText: "BROWSE COLLECTION",
    img: "/images/service_sofas.jpeg" 
  },
  { 
    id: "cot", 
    name: "COT", 
    desc: "BESPOKE BEDS FOR ULTIMATE RELAXATION & LUXURY", 
    btnText: "BROWSE COLLECTION",
    img: "/images/service_cot.jpeg" 
  },
];

export default function ServicesPage() {
  return (
    <main className="services-carousel-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .services-carousel-main {
          min-height: 100vh;
          background: transparent;
          padding: 2rem 5rem 6rem 5rem;
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
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        /* Hexagon Hero Wrapper */
        .hero-wrapper {
          position: relative;
          width: 100%;
          background: transparent;
          border-radius: 40px;
          padding: 4rem 4rem 5rem 4rem;
          margin-bottom: 4rem;
        }

        /* The cutout mask to create the Hexagon/Tab shape */
        .hero-cutout {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 35%;
          height: 100px;
          background: transparent;
          border-bottom-right-radius: 60px;
          z-index: 0;
        }
        
        /* Smooth inverse curve for the tab */
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

        /* Promo Banner on the Top Right */
        .promo-banner {
          position: absolute;
          top: 0;
          right: 0;
          left: 35%; /* starts right after the white cutout */
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
          display: none;
        }

        .cards-grid-area {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          width: 100%;
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

        /* --- MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
          .services-carousel-main {
            padding: 1rem 1.5rem 4rem 1.5rem;
          }
          
          .carousel-header {
            margin-bottom: 2rem;
          }
          
          .hero-wrapper {
            padding: 3rem 1.5rem 2rem 1.5rem;
            border-radius: 20px;
            margin-bottom: 2rem;
          }
          
          .hero-cutout {
            display: none;
          }
          
          .promo-banner {
            left: 0;
            right: 0;
            width: 100%;
            height: 36px;
            font-size: 11px;
            border-radius: 20px 20px 0 0;
          }
          
          .carousel-title {
            font-size: 28px;
          }
          
          .cards-grid-area {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .card-content {
            padding: 1.5rem 1rem;
          }
          
          .card-title {
            font-size: 18px;
          }
        }
      `}} />

      <div className="hero-wrapper">
        <div className="hero-cutout"></div>
        <div className="promo-banner">&quot;Transforming Spaces, Designing Life&quot;</div>
        
        <div className="hero-content">
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
            <div className="cards-grid-area">
              {services.map((service) => (
                <Link href={`/services/${service.id}`} key={service.id} className="service-card">
                  <div className="card-image-wrap">
                    <div className="card-image-inner">
                      <Image src={service.img} alt={service.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
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
          </div>
        </div>
      </div>

      <div className="carousel-footer">
        READY TO TRANSFORM YOUR SPACE? <Link href="/contact">REQUEST A QUOTE</Link>
      </div>
    </main>
  );
}
