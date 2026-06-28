"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText } from "lucide-react";
import { use } from "react";
import { serviceConfig } from "../../serviceData";

export default function DedicatedSubcategoryPage({ params }: { params: Promise<{ category: string, subcategory: string }> }) {
  const { category, subcategory } = use(params);
  const categoryData = serviceConfig[category];
  const subData = categoryData?.subcategories.find(s => s.id === subcategory);

  if (!subData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF9F6' }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem" }}>Subcategory not found</h1>
        <Link href={`/services/${category}`} style={{ marginLeft: "1rem", color: "#333", textDecoration: "underline" }}>Return</Link>
      </div>
    );
  }

  // Provide some placeholder images or PDFs depending on type
  const images = subData.type === "image" 
    ? [subData.img || "/images/service_wallpapers.png", subData.img || "/images/service_wallpapers.png", subData.img || "/images/service_wallpapers.png"] 
    : [];

  return (
    <main className="dedicated-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .dedicated-main {
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
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .dedicated-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .dedicated-label {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #333;
          display: block;
          margin-bottom: 1rem;
        }

        .dedicated-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.2;
        }

        /* Image Grid Layout */
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1400px;
        }

        .image-card {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #333;
        }

        .image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .image-card:hover img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
        }

        .image-card:hover .image-overlay {
          opacity: 1;
        }

        .image-overlay span {
          color: #ffffff;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transform: translateY(20px);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .image-card:hover .image-overlay span {
          transform: translateY(0);
        }

        /* PDF Grid Layout */
        .pdf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1400px;
        }

        .pdf-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background-color: transparent;
          border: 1px solid #333;
          cursor: pointer;
          transition: all 0.4s ease;
          text-align: center;
        }

        .pdf-card:hover {
          background-color: #333;
          border-color: #333;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .pdf-icon {
          color: #333;
          margin-bottom: 1.5rem;
          transition: color 0.4s ease;
        }

        .pdf-card:hover .pdf-icon {
          color: #FAF9F6;
        }

        .pdf-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
          transition: color 0.4s ease;
          letter-spacing: 0.05em;
        }

        .pdf-card:hover .pdf-title {
          color: #FAF9F6;
        }

        .pdf-meta {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 11px;
          color: #666;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.4s ease;
        }

        .pdf-card:hover .pdf-meta {
          color: rgba(250, 249, 246, 0.7);
        }
      `}} />

      <div style={{ display: 'flex', gap: '2rem', alignSelf: 'flex-start', marginBottom: '4rem', marginLeft: '5%' }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> HOME
        </Link>
        <Link href="/services" className="back-link">
          <ArrowLeft size={16} /> SERVICES
        </Link>
        <Link href={`/services/${category}`} className="back-link">
          <ArrowLeft size={16} /> {categoryData.title.toUpperCase()}
        </Link>
      </div>
      
      <div className="dedicated-header">
         <span className="dedicated-label">{categoryData.title}</span>
         <h1 className="dedicated-title">{subData.name}</h1>
      </div>

      {subData.type === "image" ? (
        <div className="image-grid">
          {images.map((img, i) => (
            <div key={i} className="image-card">
              <Image src={img} alt={`${subData.name} Gallery ${i+1}`} fill sizes="(max-width: 768px) 100vw, 350px" />
              <div className="image-overlay">
                <span>View Full Size</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pdf-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="pdf-card">
              <FileText size={40} className="pdf-icon" strokeWidth={1} />
              <span className="pdf-title">{subData.name} Vol. {item}</span>
              <span className="pdf-meta">PDF Document • 2.4 MB</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
