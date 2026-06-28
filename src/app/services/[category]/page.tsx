"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useRef, use } from "react";
import { serviceConfig } from "../serviceData";

export default function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const data = serviceConfig[category];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF9F6' }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem" }}>Category not found</h1>
        <Link href="/services" style={{ marginLeft: "1rem", color: "#333", textDecoration: "underline" }}>Return</Link>
      </div>
    );
  }

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
    <main className="category-carousel-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .category-carousel-main {
          min-height: 100vh;
          background-color: #FAF9F6;
          padding: 4rem 2rem 6rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
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

        .carousel-header {
          text-align: center;
          margin-bottom: 4rem;
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
          justify-content: center;
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
          scrollbar-width: none;
          -ms-overflow-style: none;
          justify-content: center;
          width: 100%;
        }
        
        @media (min-width: 1024px) {
          .cards-scroll-area {
             justify-content: ${data.subcategories.length > 3 ? 'flex-start' : 'center'};
          }
        }

        .cards-scroll-area::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          flex: 1 1 320px;
          max-width: 500px;
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
          background-color: #E6E1D6;
          border: 1px solid #333;
          padding: 0.75rem 1.5rem;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .service-card:hover .card-btn {
          background-color: #333;
          color: #FAF9F6;
        }
      `}} />

      <Link href="/services" className="back-link">
        <ArrowLeft size={16} /> BACK TO SERVICES
      </Link>

      <div className="carousel-header">
        <span className="carousel-label">OUR COLLECTIONS</span>
        <h1 className="carousel-title">
          Explore Our Premium {data.title}
        </h1>
      </div>

      {category === "blinds" ? (
        <div className="ecommerce-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '3rem 2rem',
          width: '100%',
          maxWidth: '1400px',
          marginTop: '2rem'
        }}>
          {data.subcategories.map((sub) => (
            <Link href={`/services/${category}/${sub.id}`} key={sub.id} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }} className="ecommerce-card group">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#E8E5E1', marginBottom: '1.5rem' }}>
                <Image 
                  src={sub.img || "/images/service_wallpapers.png"} 
                  alt={sub.name} 
                  fill 
                  style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }} 
                  className="group-hover:scale-105"
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.4))', color: 'white', opacity: 0, transition: 'opacity 0.4s ease' }} className="group-hover:opacity-100 flex justify-between items-center">
                  <span style={{ fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600 }}>QUICK VIEW</span>
                </div>
              </div>
              <div style={{ textAlign: 'left', padding: '0 0.5rem' }}>
                <h3 style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#1A1A1A', marginBottom: '0.5rem' }}>
                  {sub.name}
                </h3>
                <p style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '13px', color: '#666', fontStyle: 'italic', marginBottom: '1rem' }}>
                  {sub.desc}
                </p>
                <div style={{ 
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)", 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  letterSpacing: '0.1em', 
                  color: '#333', 
                  textTransform: 'uppercase', 
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px'
                }}>
                  VIEW DETAILS
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="carousel-container">
          {data.subcategories.length > 3 && (
            <button className="nav-btn" onClick={scrollLeft} aria-label="Scroll left">
              <ChevronLeft size={40} strokeWidth={1} />
            </button>
          )}

          <div className="cards-scroll-area" ref={scrollContainerRef}>
            {data.subcategories.map((sub) => (
              <Link href={`/services/${category}/${sub.id}`} key={sub.id} className="service-card">
                <div className="card-image-wrap">
                  <div className="card-image-inner">
                    <Image src={sub.img || "/images/service_wallpapers.png"} alt={sub.name} fill sizes="320px" />
                  </div>
                </div>
                <div className="card-content">
                  <h2 className="card-title">{sub.name}</h2>
                  <p className="card-desc">{sub.desc}</p>
                  <div className="card-btn">VIEW DETAILS</div>
                </div>
              </Link>
            ))}
          </div>

          {data.subcategories.length > 3 && (
            <button className="nav-btn" onClick={scrollRight} aria-label="Scroll right">
              <ChevronRight size={40} strokeWidth={1} />
            </button>
          )}
        </div>
      )}
    </main>
  );
}
