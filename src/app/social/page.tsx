'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function SocialPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const cards = document.querySelectorAll('.social-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="social-page">
      <style dangerouslySetInnerHTML={{__html: `
        .social-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #FDFBF9 0%, #EBE2D5 100%);
          padding: 2rem 5rem 6rem 5rem;
          font-family: var(--font-sans);
          overflow-x: hidden;
          position: relative;
        }

        .hero-bg-shape {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 750px; /* Extended further down to reach the button */
          background: url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat;
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
          border-bottom-left-radius: 50% 250px;
          border-bottom-right-radius: 50% 250px;
        }

        .page-title {
          font-family: var(--font-serif);
          font-size: 60px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 4rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          position: relative;
          z-index: 10;
        }

        .page-header {
          display: flex;
          align-items: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 10;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
          z-index: 10;
        }

        .hero-text-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          max-width: 1400px;
          margin-bottom: 4rem;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: 100px;
          line-height: 1.1;
          font-weight: 600;
          color: var(--text-primary);
          text-align: left;
          max-width: 60%;
        }

        .hero-subtitle {
          font-family: var(--font-sans);
          font-size: 24px;
          line-height: 1.5;
          color: var(--text-primary);
          text-align: right;
          max-width: 550px;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }

        .follow-btn-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 2rem;
          margin-bottom: 6rem;
        }

        .follow-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background-color: #B38A36;
          color: white;
          padding: 1.25rem 3rem;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 15px 35px rgba(179, 138, 54, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .follow-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px rgba(179, 138, 54, 0.4);
          background-color: #9d782e;
        }

        .feed-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .social-card {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .social-card.visible {
          transform: translateY(0);
          opacity: 1;
        }

        /* Stagger the transitions */
        .social-card:nth-child(1) { transition-delay: 0.1s; }
        .social-card:nth-child(2) {
          margin-top: -3rem;
          transition-delay: 0.25s;
        }
        .social-card:nth-child(3) {
          margin-top: 2rem;
          transition-delay: 0.4s;
        }

        .card-img {
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .social-card:hover .card-img {
          transform: scale(1.05);
        }
        
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 2rem;
        }

        .social-card:hover .card-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: white;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 1024px) {
          .hero-text-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-title {
            max-width: 100%;
            font-size: 70px;
            margin-bottom: 2rem;
          }
          .hero-subtitle {
            text-align: left;
          }
          .feed-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .social-card:nth-child(2) { margin-top: 0; }
          .social-card:nth-child(3) { margin-top: 0; }
        }

        @media (max-width: 768px) {
          .feed-container {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 50px;
          }
          .social-page {
            padding: 2rem;
          }
        }
      `}} />

      <div className="hero-bg-shape"></div>

      <div className="page-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>
      </div>

      <h1 className="page-title">CONNECT US WITH SOCIAL MEDIA</h1>

      <section className="hero-section">
        <div className="hero-text-container">
          <h1 className="hero-title">Turn Scrolls <br/>Into Sales.</h1>
          <p className="hero-subtitle">
            Discover the art of contemporary living. Join our exclusive community for daily design inspiration, behind-the-scenes moments, and premium home styling tips.
          </p>
        </div>

        <div className="follow-btn-container">
          <a 
            href="https://www.instagram.com/idc_home_decor2125?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="follow-btn"
          >
            FOLLOW US <ArrowUpRight size={20} />
          </a>
        </div>
      </section>

      <section className="feed-container" ref={containerRef}>
        <div className="social-card">
          <Image src="/images/accessories/ph_canvas_1.jpg" alt="Instagram Post 1" fill className="card-img" />
          <div className="card-overlay">
            <span className="overlay-text">View on Instagram <ArrowUpRight size={16}/></span>
          </div>
        </div>
        <div className="social-card">
          <Image src="/images/accessories/ph_headboard_1.jpg" alt="Instagram Post 2" fill className="card-img" />
          <div className="card-overlay">
            <span className="overlay-text">View on Instagram <ArrowUpRight size={16}/></span>
          </div>
        </div>
        <div className="social-card">
          <Image src="/images/accessories/ph_grass_1.jpg" alt="Instagram Post 3" fill className="card-img" />
          <div className="card-overlay">
            <span className="overlay-text">View on Instagram <ArrowUpRight size={16}/></span>
          </div>
        </div>
      </section>
    </main>
  );
}
