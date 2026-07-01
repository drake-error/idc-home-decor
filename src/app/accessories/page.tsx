"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { accessoriesData } from "./accessoriesData";

export default function AccessoriesPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mock featured products for the homepage grid - exactly 4 to fill the grid without empty spaces
  const featuredProducts = [
    { id: 1, cat: "pufy", title: "Velvet Minimalist Pufy", sub: "Premium Seating", price: "₹2,500", img: accessoriesData[0].images[0] },
    { id: 2, cat: "pillows", title: "Silk Throw Pillow", sub: "Hand-stitched detailing", price: "₹850", img: accessoriesData[1].images[0] },
    { id: 3, cat: "tables", title: "Marble Side Table", sub: "Brushed gold finish", price: "₹12,999", img: accessoriesData[2].images[0] },
    { id: 4, cat: "carpets", title: "Hand-woven Rug", sub: "Luxury textures", price: "₹8,500", img: accessoriesData[3].images[0] },
  ];

  return (
    <div className="accessories-page">
      <style dangerouslySetInnerHTML={{__html: `
        .accessories-page {
          min-height: 100vh;
          background: #FFFFFF;
          padding: 2rem 5rem 6rem 5rem;
          font-family: var(--font-sans);
        }

        /* Top Header Area inside page to simulate Furnix white header */
        .page-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
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

        /* Hexagon Hero Wrapper */
        .hero-wrapper {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #FDFBF9 0%, #EBE2D5 100%);
          border-radius: 40px;
          padding: 6rem 4rem 5rem 4rem;
          margin-bottom: 4rem;
        }

        /* The cutout mask to create the Hexagon/Tab shape */
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
          text-align: center;
        }

        .hero-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #1A1A1A;
          line-height: 1.1;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .hero-subtitle {
          font-size: 1rem;
          color: #666;
          font-weight: 500;
          margin-bottom: 4rem;
        }

        /* Category Carousel */
        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .carousel-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1A1A1A;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s, background 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .carousel-btn:hover {
          transform: scale(1.05);
          background: #B38A36;
        }

        .categories-scroll {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 1rem 0;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .categories-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-card {
          width: 160px;
          height: 160px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          flex-shrink: 0;
          padding: 1.5rem;
          font-weight: 600;
          font-size: 1.1rem;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
          border: 1px solid rgba(179, 138, 54, 0.5);
          box-shadow: 0 10px 30px rgba(179, 138, 54, 0.15);
          position: relative;
          overflow: hidden;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(179, 138, 54, 0.25);
        }
        
        .category-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          transition: background 0.3s;
          z-index: 1;
        }

        .category-card:hover .category-overlay {
          background: rgba(0,0,0,0.2);
        }

        .category-name {
          position: relative;
          z-index: 2;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Product Grid */
        .products-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .product-card {
          background: #FFFFFF;
          border-radius: 32px;
          padding: 1rem;
          border: 1px solid rgba(179, 138, 54, 0.3);
          box-shadow: 0 10px 40px rgba(179, 138, 54, 0.12);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 45px rgba(179, 138, 54, 0.2);
        }

        .product-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 24px;
          overflow: hidden;
          background: #F8F8F8;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0 0.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-title {
          font-size: 13px;
          font-weight: 700;
          color: #1A1A1A;
        }
        
        .product-sub {
          font-size: 12px;
          color: #888;
        }

        .product-price {
          font-size: 18px;
          font-weight: 800;
          color: #1A1A1A;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1A1A1A;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .cart-btn {
          background: #1A1A1A;
          color: white;
          border: none;
          padding: 0.6rem 1.25rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .cart-btn:hover {
          background: #B38A36;
        }

        .icon-btn {
          color: #888;
          cursor: pointer;
          transition: color 0.2s;
        }
        .icon-btn:hover {
          color: #B38A36;
        }

        /* --- MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
          .accessories-page {
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
          .hero-title {
            font-size: 32px;
          }
          .hero-title br {
            display: none;
          }
          .products-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .product-card {
            padding: 0.8rem;
          }
          .product-title {
            font-size: 11px;
          }
          .product-sub {
            font-size: 10px;
          }
        }
      `}} />

      <div className="page-header">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>
      </div>

      <div className="hero-wrapper">
        <div className="hero-cutout"></div>
        <div className="promo-banner">&quot;Transforming Spaces, Designing Life&quot;</div>
        
        <div className="hero-content">
          <h1 className="hero-title">FIND YOUR<br/>FAVOURITE ACCESSORIES</h1>
          <p className="hero-subtitle">Explore World Class Top Accessories As Per Your Requirements & Choice</p>
          
          <div className="carousel-wrapper">
            <button className="carousel-btn" onClick={() => scroll('left')}>
              <ChevronLeft size={24} />
            </button>
            
            <div className="categories-scroll" ref={carouselRef}>
              {accessoriesData.map((item) => {
                return (
                  <Link 
                    href={`/accessories/${item.id}`} 
                    key={item.id} 
                    className="category-card"
                  >
                    <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    <div className="category-overlay"></div>
                    <span className="category-name">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <button className="carousel-btn" onClick={() => scroll('right')}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <section className="products-section">
        {featuredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <Image src={product.img} alt={product.title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="product-details">
              <div className="detail-row">
                <span className="product-title">{product.title}</span>
              </div>
              <div className="detail-row">
                <span className="product-sub">{product.sub}</span>
                <Heart 
                  size={16} 
                  className="icon-btn" 
                  fill={liked[product.id] ? "#B38A36" : "none"}
                  color={liked[product.id] ? "#B38A36" : "#888"}
                  onClick={() => toggleLike(product.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
