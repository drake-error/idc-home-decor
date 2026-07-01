"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="about-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .about-main {
          min-height: 100vh;
          background: transparent;
          padding: 2rem 5rem 6rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-wrapper {
          position: relative;
          width: 100%;
          background: transparent;
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
          background: transparent;
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
        
        .about-split {
          display: flex;
          gap: 4rem;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .about-text {
          flex: 1;
        }

        .about-label {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #333;
          display: block;
          margin-bottom: 1rem;
        }

        .about-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.1;
          margin-bottom: 2.5rem;
        }

        .about-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 1.5rem;
        }

        .about-desc:last-child {
          margin-bottom: 0;
        }

        .about-images {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 250px);
          gap: 1.5rem;
        }

        .img-large {
          grid-row: 1 / -1;
          grid-column: 1 / 2;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .img-small-top {
          grid-row: 1 / 2;
          grid-column: 2 / 3;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        
        .img-small-bottom {
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        
        @media (max-width: 1024px) {
          .about-split {
            flex-direction: column;
          }
          
          .about-images {
            width: 100%;
          }
        }

        /* --- MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
          .about-main {
            padding: 1rem 1.5rem 4rem 1.5rem;
          }
          
          .hero-wrapper {
            padding: 3rem 1.5rem 2rem 1.5rem;
            border-radius: 20px;
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
          
          .about-title {
            font-size: 36px;
          }
          
          .about-title br {
            display: none;
          }
          
          .about-images {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          
          .img-large {
            grid-row: auto;
            grid-column: auto;
            aspect-ratio: 1/1;
          }
          
          .img-small-top, .img-small-bottom {
            grid-row: auto;
            grid-column: auto;
            aspect-ratio: 4/3;
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
          
          <div className="about-split">
            <div className="about-text">
              <span className="about-label">DISCOVER IDC</span>
              <h1 className="about-title">Where Vision<br/>Meets Design.</h1>
              <p className="about-desc">
                At IDC – Interior Designer Comfort, we transform ideas into thoughtfully designed spaces that combine style, comfort, and functionality. We specialize in creating interiors for homes, offices, and commercial spaces, with every design tailored to reflect our clients' unique vision and lifestyle.
              </p>
              <p className="about-desc">
                Our approach is built on creativity, quality craftsmanship, and attention to detail. From planning and design to execution, we ensure a smooth and transparent process while delivering interiors that are practical, elegant, and built to last. Every project is handled with care, using quality materials and modern design solutions to achieve exceptional results.
              </p>
              <p className="about-desc">
                As a growing interior design company, we are committed to building lasting relationships through trust, professionalism, and customer satisfaction. At IDC, our mission is to create spaces that inspire, enhance everyday living, and bring your vision to life with excellence. ✨
              </p>
            </div>
            
            <div className="about-images">
              <div className="img-large">
                <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" alt="Luxury Living Room" fill style={{objectFit: 'cover'}} />
              </div>
              <div className="img-small-top">
                <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop" alt="Modern House Interior" fill style={{objectFit: 'cover'}} />
              </div>
              <div className="img-small-bottom">
                <Image src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop" alt="Elegant Decor Details" fill style={{objectFit: 'cover'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
