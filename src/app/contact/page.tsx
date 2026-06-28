"use client";
import Link from "next/link";
import { ArrowLeft, MessageCircle, HelpCircle, MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What if my booking request is not received?",
    answer: "If you do not receive a confirmation within 24 hours, please contact us directly with a call for urgent requests to ensure your booking is secured."
  },
  {
    question: "Is IDC trustable?",
    answer: "Absolutely. We are proud to have successfully designed spaces for over 500+ verified and happy customers who trust our expertise and quality."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Timelines depend on the scope of the project. A single room makeover typically takes 1-3 weeks, while a full home interior design can take 6-8 weeks from planning to execution."
  },
  {
    question: "Do you offer free initial consultations?",
    answer: "No."
  },
  {
    question: "Can I change my design plan later?",
    answer: "We offer flexibility during the initial planning phase But Not After Ordering Items. Once the execution phase begins, changes may incur additional costs and timeline extensions."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <main className="contact-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-main {
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

        /* HEADER SECTION */
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
        }
        
        .contact-subtitle {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 18px;
          color: #555;
        }

        /* 4 CARDS GRID */
        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 5rem;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          background: #FFFFFF;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #F5F0EA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .card-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          flex-grow: 1;
        }

        .card-link {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
        }
        
        .card-link:hover {
          color: #B38A36;
        }

        /* FAQ SECTION */
        .faq-section {
          max-width: 800px;
          margin: 0 auto 5rem auto;
        }

        .faq-header {
          text-align: center;
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 32px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 2rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: transparent;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          background: transparent;
          border: none;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 500;
          color: #1A1A1A;
          cursor: pointer;
          text-align: left;
        }

        .faq-answer {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15px;
          color: #555;
          line-height: 1.6;
          padding-bottom: 1.5rem;
          display: none;
        }

        .faq-answer.open {
          display: block;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* CTA SECTION */
        .cta-section {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.05);
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 28px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .cta-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15px;
          color: #666;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary {
          background: #1A1A1A;
          color: #FFF;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        
        .btn-primary:hover {
          background: #333;
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 32px;
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

          <div className="contact-header">
            <h1 className="contact-title">Contact our design experts</h1>
            <p className="contact-subtitle">Let us know how we can help transform your space.</p>
          </div>

          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="card-icon"><MessageCircle size={20} /></div>
              <h3 className="card-title">Chat to sales</h3>
              <p className="card-desc">Speak to our friendly design team about your project.</p>
              <a href="mailto:idchomedecor@gmail.com" className="card-link">idchomedecor@gmail.com</a>
            </div>
            
            <div className="contact-card">
              <div className="card-icon"><HelpCircle size={20} /></div>
              <h3 className="card-title">Chat to support</h3>
              <p className="card-desc">We're here to help with your ongoing projects.</p>
              <a href="mailto:idchomedecor@gmail.com" className="card-link">idchomedecor@gmail.com</a>
            </div>

            <div className="contact-card">
              <div className="card-icon"><MapPin size={20} /></div>
              <h3 className="card-title">Visit us</h3>
              <p className="card-desc">Visit our luxury design studio HQ.</p>
              <a href="https://maps.app.goo.gl/QBW5vg86kvACFjGL8" target="_blank" rel="noopener noreferrer" className="card-link">View on Google Maps</a>
            </div>

            <div className="contact-card">
              <div className="card-icon"><Phone size={20} /></div>
              <h3 className="card-title">Call / WhatsApp us</h3>
              <p className="card-desc">Everyday from 10am to 9pm. All numbers available on WhatsApp.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="tel:+918088143531" className="card-link">+91 8088143531</a>
                <a href="tel:+919606029697" className="card-link">+91 96060 29697</a>
                <a href="tel:+917892524940" className="card-link">+91 78925 24940</a>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2 className="faq-header">Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.question}
                    {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-section">
            <h2 className="cta-title">Ready to transform your space?</h2>
            <p className="cta-desc">Start your luxury design journey with us today. Book an initial consultation.</p>
            <div className="cta-buttons">
              <Link href="/booking" className="btn-primary">Book Consultation</Link>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
