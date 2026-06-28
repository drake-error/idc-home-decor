'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, User, Star, ArrowUp, ArrowDown } from 'lucide-react';

export default function BookingPage() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="booking-layout">
      <style dangerouslySetInnerHTML={{__html: `
        .booking-layout {
          min-height: 100vh;
          width: 100vw;
          background: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
        }

        .booking-container {
          background: #FFFFFF;
          width: 100%;
          max-width: 1500px;
          height: 90vh;
          min-height: 800px;
          border-radius: 40px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
        }

        /* --- LEFT COLUMN --- */
        .left-col {
          flex: 1;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .left-header {
          display: flex;
          align-items: center;
          margin-bottom: 4rem;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-right: auto;
          letter-spacing: -0.05em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 13px;
          font-weight: 500;
          color: #666;
        }

        .nav-links a {
          color: #666;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #000;
        }

        .divider {
          color: #E0E0E0;
        }

        .hero-title {
          font-family: var(--font-sans);
          font-size: 80px;
          line-height: 1.05;
          font-weight: 600;
          color: #000;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
          position: relative;
        }

        .avatar-stack-absolute {
          position: absolute;
          top: 10px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .avatars-wrapper {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .avatars-wrapper img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid #FFF;
          margin-left: -15px;
          object-fit: cover;
        }
        
        .avatars-wrapper img:first-child { margin-left: 0; }

        .intro-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .intro-text {
          font-size: 14px;
          font-weight: 600;
          color: #000;
        }

        .line {
          flex: 1;
          height: 1px;
          background: #E0E0E0;
        }

        .desc-row {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .desc-number {
          font-size: 12px;
          font-weight: 600;
          color: #000;
          margin-top: 5px;
        }

        .desc-text {
          flex: 1;
          font-size: 14px;
          line-height: 1.6;
          color: #555;
          max-width: 350px;
        }

        .book-btn {
          background: #000;
          color: #FFF;
          border: none;
          border-radius: 30px;
          padding: 0.8rem 1.5rem;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        
        .book-btn:hover {
          transform: translateY(-2px);
          background: #222;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .stat h3 {
          font-size: 32px;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.2rem;
        }

        .stat p {
          font-size: 12px;
          color: #666;
        }

        .bottom-card {
          flex: 1;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 180px;
        }

        .card-bg {
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .pill-light {
          background: #FFF;
          color: #000;
          font-size: 11px;
          font-weight: 500;
          padding: 0.4rem 1rem;
          border-radius: 20px;
        }

        .arrows {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .arrow-btn {
          width: 28px;
          height: 28px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .card-bottom {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pill-dark-transparent {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          color: white;
          font-size: 11px;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        /* --- RIGHT COLUMN --- */
        .right-col {
          flex: 1.1;
          position: relative;
          border-radius: 30px;
          margin: 1rem;
          overflow: hidden;
        }

        .right-bg {
          object-fit: cover;
        }

        .right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.6) 100%);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .right-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
        }

        .contact-wrapper {
          position: relative;
        }

        .contact-btn {
          background: #FFF;
          color: #000;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .contact-btn:hover {
          background: #f0f0f0;
        }

        .contact-modal {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #FFF;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          width: 250px;
          z-index: 50;
          animation: fadeIn 0.3s ease;
        }

        .contact-modal p {
          font-size: 13px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 1rem;
        }
        
        .contact-modal p:last-child {
          margin-bottom: 0;
        }

        .contact-modal strong {
          color: #000;
          font-weight: 600;
          display: block;
          margin-bottom: 0.2rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .profile-btn {
          width: 36px;
          height: 36px;
          background: #FFF;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .floating-location {
          background: #FFF;
          padding: 1rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          position: absolute;
          top: 15%;
          left: 3rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .loc-text {
          font-size: 13px;
          font-weight: 500;
          color: #000;
          line-height: 1.4;
        }

        .loc-img-wrapper {
          position: relative;
          width: 60px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
        }

        .loc-arrow {
          width: 30px;
          height: 30px;
          background: #000;
          color: #FFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .right-bottom {
          margin-top: auto;
        }

        .overlay-desc {
          color: #FFF;
          font-size: 16px;
          line-height: 1.6;
          max-width: 450px;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .action-pills {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pill-btn {
          background: #FFF;
          color: #000;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .pill-btn.dark {
          background: transparent;
          color: #FFF;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 0.8rem 2.5rem;
        }

        .pill-btn.dark:hover {
          background: rgba(255,255,255,0.1);
        }
      `}} />

      <div className="booking-container">
        
        {/* LEFT COLUMN */}
        <div className="left-col">
           <div className="left-header">
             <div className="logo">idc.</div>
             <nav className="nav-links">
               <Link href="/">Home</Link>
               <span className="divider">|</span>
               <Link href="/services">Services</Link>
               <span className="divider">|</span>
               <Link href="/accessories">Accessories</Link>
             </nav>
           </div>
           
           <h1 className="hero-title">
             Reserve Your<br/>Design Consultation
             <div className="avatar-stack-absolute">
               <div className="avatars-wrapper">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="avatar" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="avatar" />
                 <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" alt="avatar" />
               </div>
             </div>
           </h1>
           
           <div className="intro-row">
             <span className="intro-text">Let's get acquainted!</span>
             <div className="line"></div>
           </div>

           <div className="desc-row">
             <div className="desc-number">05</div>
             <p className="desc-text">We specialize in curating exceptional interior design experiences, providing an unparalleled level of comfort, luxury, and convenience for your dream space.</p>
             <button className="book-btn">Book Now <ArrowUpRight size={16} /></button>
           </div>

           <div className="stats-row">
             <div className="stat">
               <h3>500+</h3>
               <p>Projects Completed</p>
             </div>
             <div className="stat">
               <h3>10k+</h3>
               <p>Happy Customers</p>
             </div>
             <div className="stat">
               <h3>50+</h3>
               <p>Design Experts</p>
             </div>
           </div>

           <div className="bottom-card">
             <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" alt="Living Room" fill className="card-bg" />
             <div className="card-overlay">
               <div className="card-top">
                 <span className="pill-light">Bangalore, India</span>
                 <div className="arrows">
                   <div className="arrow-btn"><ArrowUp size={14} /></div>
                   <div className="arrow-btn"><ArrowDown size={14} /></div>
                 </div>
               </div>
               <div className="card-bottom">
                 <span className="pill-dark-transparent">Popular</span>
                 <div className="stars">
                   <Star fill="#FFD700" color="#FFD700" size={12}/>
                   <Star fill="#FFD700" color="#FFD700" size={12}/>
                   <Star fill="#FFD700" color="#FFD700" size={12}/>
                   <Star fill="#FFD700" color="#FFD700" size={12}/>
                   <Star fill="#FFD700" color="#FFD700" size={12}/>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">
          <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" alt="Modern House" fill className="right-bg" />
          
          <div className="right-overlay">
            
            <div className="right-header">
              <div className="contact-wrapper">
                <button className="contact-btn" onClick={() => setShowContact(!showContact)}>Contact Us</button>
                {showContact && (
                  <div className="contact-modal">
                    <p><strong>Email:</strong><br/>idchomedecor@gmail.com</p>
                    <p><strong>Phone:</strong><br/>+91 96060 29697<br/>+91 78925 24940<br/>+91 8088143531</p>
                  </div>
                )}
              </div>
              <button className="profile-btn"><User size={16} color="#000" /></button>
            </div>

            <div className="floating-location">
              <div className="loc-text">IDC Headquarters,<br/>Bangalore</div>
              <div className="loc-img-wrapper">
                <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=200&auto=format&fit=crop" alt="HQ" fill style={{objectFit: 'cover'}} />
              </div>
              <div className="loc-arrow"><ArrowUpRight size={16}/></div>
            </div>

            <div className="right-bottom">
              <p className="overlay-desc">Enjoy a luxurious design experience in a bespoke interior with breathtaking aesthetics and easy access to vibrant city life and culinary delights.</p>
              
              <div className="action-pills">
                <button className="pill-btn">Select Service <ChevronDown size={16}/></button>
                <button className="pill-btn">Date / Time <ChevronDown size={16}/></button>
                <button className="pill-btn dark">Search</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
