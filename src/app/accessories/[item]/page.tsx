"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Plus } from "lucide-react";
import { use } from "react";
import { accessoriesData } from "../accessoriesData";

export default function DedicatedAccessoryPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const unwrappedParams = use(params);
  const accessoryId = unwrappedParams.item;
  
  const categoryData = accessoriesData.find((item) => item.id === accessoryId);

  if (!categoryData) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <Link href="/accessories">Back to Accessories</Link>
      </div>
    );
  }

  return (
    <div className="dedicated-page">
      <style dangerouslySetInnerHTML={{__html: `
        .dedicated-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #FCFBFA 0%, #F4EFE6 100%);
          padding: 4rem 5rem;
          font-family: var(--font-sans);
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

        .dedicated-header {
          margin-bottom: 4rem;
        }

        .dedicated-label {
          font-family: var(--font-sans);
          font-size: 13px;
          letter-spacing: 0.2em;
          color: #B38A36;
          text-transform: uppercase;
          display: block;
          margin-bottom: 1rem;
        }

        .dedicated-title {
          font-size: 4rem;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .products-grid {
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
      `}} />

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> HOME
        </Link>
        <Link href="/accessories" className="back-link">
          <ArrowLeft size={16} /> ACCESSORIES
        </Link>
      </div>
      
      <div className="dedicated-header">
         <span className="dedicated-label">Accessories Collection</span>
         <h1 className="dedicated-title">{categoryData.name}</h1>
      </div>

      <div className="products-grid">
        {categoryData.images.map((imgSrc, idx) => {
          // Dynamic pricing mocking based on index
          const prices = ["₹1,250", "₹3,400", "₹8,999"];
          return (
            <div className="product-card" key={idx}>
              <div className="product-image-wrap">
                <Image src={imgSrc} alt={`${categoryData.name} Showcase ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="product-details">
                <div className="detail-row">
                  <span className="product-title">
                    {categoryData.id === 'mandir' && idx === 0 ? "Hindu Pooja Mandir" :
                     categoryData.id === 'mandir' && idx === 1 ? "Christian Prayer Altar" :
                     categoryData.id === 'mandir' && idx === 2 ? "Muslim Prayer Space" :
                     `Luxury ${categoryData.name}`}
                  </span>
                  <button className="action-btn"><Plus size={16}/></button>
                </div>
                <div className="detail-row">
                  <span className="product-sub">Premium Quality Design</span>
                  <Heart size={16} className="icon-btn" />
                </div>
                <div className="detail-row" style={{ marginTop: '0.5rem' }}>
                  <span className="product-price">{prices[idx % prices.length]}</span>
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
