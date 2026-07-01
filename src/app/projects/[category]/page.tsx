"use client";
import Link from "next/link";
import { ArrowLeft, Star, Upload, Trash2, X } from "lucide-react";
import { use, useState, useRef, useEffect } from "react";
import { getProjectReviews, submitProjectReview, uploadFile, ProjectReview, isAdmin } from "../../../lib/api";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

const projectCategories = {
  wallpapers: "Wallpapers",
  curtains: "Curtains",
  blinds: "Blinds",
  flooring: "Flooring",
  sofas: "Sofa",
  cot: "Cot"
};

export default function ProjectCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  // @ts-ignore
  const categoryName = projectCategories[category as keyof typeof projectCategories] || "Projects";

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviews, setReviews] = useState<ProjectReview[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      const data = await getProjectReviews(category);
      setReviews(data);
      const admin = await isAdmin();
      setAdminMode(admin);
    };
    init();
  }, [category]);

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this review?")) {
      const { error } = await supabase.from('project_reviews').delete().eq('id', id);
      if (!error) {
        setReviews(reviews.filter(review => review.id !== id));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a star rating.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      let uploadedUrl = null;
      if (selectedFile) {
        uploadedUrl = await uploadFile(selectedFile);
      }

      await submitProjectReview({
        category,
        reviewer_name: reviewerName,
        rating,
        review_text: reviewText,
        img_url: uploadedUrl || undefined
      });

      alert("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      setReviewerName("");
      setSelectedFile(null);
      
      const updated = await getProjectReviews(category);
      setReviews(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="portal-main">
      <style dangerouslySetInnerHTML={{ __html: `
        .portal-main {
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
          margin-bottom: 4rem;
        }

        .category-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 500;
          color: #1A1A1A;
          line-height: 1.1;
        }

        .portal-split {
          display: flex;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* LEFT SIDE - REVIEW FORM */
        .review-form-section {
          flex: 1;
          background: rgba(255, 255, 255, 0.6);
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.05);
          height: fit-content;
        }

        .form-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #1A1A1A;
        }

        .form-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          color: #666;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: #FFF;
          border: 1px solid #E0E0E0;
          padding: 1rem;
          border-radius: 12px;
          font-size: 14px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #000;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .star-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          border: 1px dashed #A09D96;
          border-radius: 12px;
          background: transparent;
          color: #666;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-btn:hover {
          background: rgba(0,0,0,0.02);
          border-color: #000;
          color: #000;
        }

        .submit-btn {
          width: 100%;
          background: #000;
          color: #FFF;
          border: none;
          padding: 1rem;
          border-radius: 30px;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #333;
        }

        /* RIGHT SIDE - REVIEWS FEED */
        .reviews-feed {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .review-card {
          position: relative;
          display: flex;
          gap: 1.5rem;
          background: transparent;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .delete-btn {
          position: absolute;
          top: 0;
          right: 0;
          background: transparent;
          border: none;
          color: #A09D96;
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .delete-btn:hover {
          color: #D32F2F;
        }

        .review-card:last-child {
          border-bottom: none;
        }

        .review-img-box {
          width: 120px;
          height: 120px;
          background: #EAE5DE;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        .review-content-box {
          flex: 1;
        }

        .review-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 20px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .review-stars {
          display: flex;
          gap: 2px;
          color: #000;
          margin-bottom: 1rem;
        }

        .review-text {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-style: italic;
          font-size: 14px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1rem;
        }

        .review-author {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #1A1A1A;
        }

        @media (max-width: 1024px) {
          .portal-split {
            flex-direction: column;
          }
        }
        
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
        }
        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }
        .modal-img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
        }
        .modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: white;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
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
            <h1 className="category-title">{categoryName} Reviews</h1>
          </div>
          
          <div className="portal-split">
            {/* WRITE A REVIEW FORM */}
            <div className="review-form-section">
              <h2 className="form-title">Write a Review</h2>
              <p className="form-desc">Share your experience with our {categoryName.toLowerCase()} service.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <div className="star-selector" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={24} 
                        fill={(hoverRating || rating) >= star ? "#000" : "none"} 
                        color={(hoverRating || rating) >= star ? "#000" : "#A09D96"}
                        strokeWidth={1.5}
                        onMouseEnter={() => setHoverRating(star)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter your name" 
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Tell us about your project..." 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Photos</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button type="button" className="upload-btn" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={18} /> {selectedFile ? selectedFile.name : 'Upload Image'}
                  </button>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>

            {/* PAST REVIEWS FEED */}
            <div className="reviews-feed">
              {reviews.map((rev) => (
                <div className="review-card" key={rev.id}>
                  {adminMode && (
                    <button className="delete-btn" onClick={() => handleDelete(rev.id)} title="Delete Review">
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                  {rev.img_url ? (
                    <div 
                      className="review-img-box" 
                      style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
                      onClick={() => setModalImage(rev.img_url || null)}
                    >
                      <Image src={rev.img_url} alt="Review upload" fill style={{ objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div className="review-img-box">No Image</div>
                  )}
                  
                  <div className="review-content-box">
                    <h3 className="review-title">Client Work on {categoryName}</h3>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          fill={rev.rating >= star ? "#000" : "none"} 
                          color={rev.rating >= star ? "#000" : "#BDB7AC"}
                          strokeWidth={2} 
                        />
                      ))}
                    </div>
                    <p className="review-text">"{rev.review_text}"</p>
                    <div className="review-author">— {rev.reviewer_name}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalImage(null)}>
              <X size={32} />
            </button>
            <img src={modalImage} alt="Full size" className="modal-img" />
          </div>
        </div>
      )}
    </main>
  );
}
