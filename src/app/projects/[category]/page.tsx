"use client";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { use } from "react";

const projectCategories = {
  wallpapers: "Wallpapers",
  curtains: "Curtains",
  blinds: "Blinds",
  flooring: "Flooring",
  sofas: "Sofa",
  cot: "Cot"
};

// Generating dummy placeholder projects for luxury feel
const dummyProjects = [1, 2, 3, 4];

export default function ProjectCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  
  // @ts-ignore
  const categoryName = projectCategories[category as keyof typeof projectCategories] || "Projects";

  return (
    <main className="project-detail-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .project-detail-main {
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

        .category-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .category-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.1;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-row {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .project-row:nth-child(even) {
          flex-direction: row-reverse;
        }

        .project-img-wrap {
          flex: 1.2;
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          background: #EAE5DE;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .placeholder-img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-family: var(--font-sans);
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .project-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .project-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 32px;
          font-weight: 500;
          color: #1A1A1A;
        }

        .review-box {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 2rem;
          border-radius: 16px;
        }

        .review-text {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-style: italic;
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1.5rem;
          min-height: 80px; /* Placeholder space */
        }

        .reviewer-name {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .stars {
          display: flex;
          gap: 4px;
          color: #BDB7AC; /* Unfilled blank star color */
        }
          
        @media (max-width: 1024px) {
          .project-row, .project-row:nth-child(even) {
            flex-direction: column;
          }
          .project-img-wrap {
            width: 100%;
          }
        }
      `}} />

      <div className="hero-wrapper">
        <div className="hero-cutout"></div>
        <div className="promo-banner">&quot;Transforming Spaces, Designing Life&quot;</div>
        
        <div className="hero-content">
          <Link href="/projects" className="back-link">
            <ArrowLeft size={16} /> BACK TO PROJECTS
          </Link>
          
          <div className="category-header">
            <h1 className="category-title">{categoryName} Projects</h1>
          </div>
          
          <div className="projects-list">
            {dummyProjects.map((proj, idx) => (
              <div className="project-row" key={idx}>
                <div className="project-img-wrap">
                  <div className="placeholder-img">Image Placeholder</div>
                </div>
                <div className="project-info">
                  <h2 className="project-title">Client Work on {categoryName}</h2>
                  <div className="review-box">
                    <p className="review-text">[Customer review content will be displayed here]</p>
                    <div className="reviewer-name">[Client Name]</div>
                    <div className="stars">
                      <Star size={16} fill="none" strokeWidth={2} />
                      <Star size={16} fill="none" strokeWidth={2} />
                      <Star size={16} fill="none" strokeWidth={2} />
                      <Star size={16} fill="none" strokeWidth={2} />
                      <Star size={16} fill="none" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
