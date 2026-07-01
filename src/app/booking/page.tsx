'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, User, Star, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';

export default function BookingPage() {
  const [showContact, setShowContact] = useState(false);
  const [booked, setBooked] = useState(false);
  const [service, setService] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleBook = () => {
    if (!service || !dateTime || !phone || !address) {
      alert("Please fill in all booking details.");
      return;
    }
    const body = `I would like to book a ${service} on ${dateTime}.%0D%0A%0D%0AMy Details:%0D%0APhone: ${phone}%0D%0AAddress: ${address}`;
    window.location.href = `mailto:idchomedecor@gmail.com?subject=Booking Request: ${service}&body=${body}`;
    
    setBooked(true);
    setTimeout(() => setBooked(false), 5000);
  };

  return (
    <div className="booking-layout">
      <style dangerouslySetInnerHTML={{__html: `
        .booking-layout {
          min-height: 100vh;
          width: 100%;
          background: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-sizing: border-box;
          font-family: var(--font-sans, 'Inter', sans-serif);
          overflow-x: hidden;
        }

        .booking-container {
          background: #F5F0EA;
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
          padding: 2.5rem 4rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .left-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-right: auto;
          letter-spacing: -0.05em;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          text-decoration: none;
          margin-bottom: 2rem;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #000;
        }

        .nav-booking {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-sans);
          font-size: 80px;
          line-height: 1.05;
          font-weight: 600;
          color: #000;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          position: relative;
        }

        .intro-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
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
          margin-bottom: 1.5rem;
        }

        .desc-text {
          flex: 1;
          font-size: 14px;
          line-height: 1.6;
          color: #555;
          max-width: 350px;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 4rem;
          max-width: 400px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          background: #FFF;
          border: 1px solid #E0E0E0;
          padding: 1rem 1.5rem;
          border-radius: 30px;
          font-size: 14px;
          color: #333;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #000;
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

        .toast-message {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          color: #FFF;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          z-index: 1000;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          text-align: center;
          animation: slideUp 0.3s ease;
        }
        
        .toast-message h4 {
          margin: 0 0 0.5rem 0;
          font-size: 18px;
        }
        
        .toast-message p {
          margin: 0;
          font-size: 14px;
          color: #CCC;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
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

        /* --- MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
          .booking-layout {
            padding: 1rem;
          }
          
          .booking-container {
            flex-direction: column;
            border-radius: 24px;
            height: auto;
            min-height: auto;
            overflow: visible;
          }
          
          .left-col {
            padding: 2rem 1.5rem;
          }
          
          .hero-title {
            font-size: 42px;
          }
          
          .hero-title br {
            display: none;
          }
          
          .desc-row {
            flex-direction: column;
            gap: 1rem;
          }
          
          .stats-row {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
          
          .right-col {
            min-height: 400px;
            margin: 0;
            border-radius: 0 0 24px 24px;
          }
          
          .right-overlay {
            padding: 2rem 1.5rem;
          }
          
          .floating-location {
            top: 5rem;
            left: 1.5rem;
            padding: 0.6rem;
            transform: scale(0.85);
            transform-origin: left top;
          }
        }
      `}} />

      <div className="booking-container">
        
        {/* LEFT COLUMN */}
        <div className="left-col">
           <Link href="/" className="back-link">
             <ArrowLeft size={16} /> Back to Home
           </Link>
           <div className="left-header">
             <div className="logo">IDC HOME DECOR</div>
             <span className="nav-booking">BOOKING</span>
           </div>
           
           <h1 className="hero-title">
             Book Your<br/>Meeting
           </h1>
           
           <div className="intro-row">
             <span className="intro-text">Let's get acquainted!</span>
             <div className="line"></div>
           </div>

           <div className="desc-row">
             <p className="desc-text">Book us through Online, Call or E-mail.We specialize in curating exceptional interior design experiences, providing an unparalleled level of comfort, luxury, and convenience for your dream space.</p>
           </div>

           <div className="booking-form">
             <div className="form-group">
               <select className="form-input" value={service} onChange={(e) => setService(e.target.value)}>
                 <option value="" disabled>Select Service</option>
                 <option value="Interior Design">Interior Design</option>
                 <option value="Consultation">Consultation</option>
                 <option value="Renovation">Renovation</option>
               </select>
             </div>
             <div className="form-group">
               <input type="datetime-local" className="form-input" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
             </div>
             <div className="form-group">
               <input type="tel" className="form-input" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
             </div>
             <div className="form-group">
               <input type="text" className="form-input" placeholder="Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
             </div>
             <button className="book-btn" onClick={handleBook} style={{ alignSelf: 'center', marginTop: '1rem', padding: '1rem 4rem' }}>
               BOOK NOW
             </button>
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
                    <p><strong>Email:</strong><br/><a href="mailto:idchomedecor@gmail.com" style={{color: '#666', textDecoration: 'none'}}>idchomedecor@gmail.com</a></p>
                    <p><strong>Phone:</strong><br/>
                      <a href="tel:+919606029697" style={{color: '#666', textDecoration: 'none'}}>+91 96060 29697</a><br/>
                      <a href="tel:+917892524940" style={{color: '#666', textDecoration: 'none'}}>+91 78925 24940</a><br/>
                      <a href="tel:+918088143531" style={{color: '#666', textDecoration: 'none'}}>+91 8088143531</a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <a href="https://maps.app.goo.gl/QBW5vg86kvACFjGL8" target="_blank" className="floating-location" style={{ textDecoration: 'none' }}>
              <div className="loc-text">IDC OFFICE,<br/>Bangalore</div>
              <div className="loc-img-wrapper">
                <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=200&auto=format&fit=crop" alt="HQ" fill style={{objectFit: 'cover'}} />
              </div>
              <div className="loc-arrow"><ArrowUpRight size={16}/></div>
            </a>

            <div className="right-bottom">
              <p className="overlay-desc">Enjoy a luxurious design experience in a bespoke interior with breathtaking aesthetics and easy access to vibrant city life and culinary delights.</p>
            </div>
            
          </div>
        </div>
      </div>
      
      {booked && (
        <div className="toast-message">
          <h4>Booked!</h4>
          <p>We received your request, we'll contact you soon!</p>
        </div>
      )}
    </div>
  )
}
