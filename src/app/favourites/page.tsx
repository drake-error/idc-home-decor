"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "../../lib/useWishlist";
import { useRouter } from "next/navigation";

export default function FavouritesPage() {
  const { liked, toggleLike } = useWishlist();
  const likedItems = Object.values(liked);

  return (
    <div className="favourites-page">
      <style dangerouslySetInnerHTML={{__html: `
        .favourites-page {
          min-height: 100vh;
          background: transparent;
          padding: 2rem 5rem 6rem 5rem;
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
          margin-bottom: 2rem;
        }

        .back-link:hover {
          color: #000;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          margin-bottom: 3rem;
          text-transform: uppercase;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
        }

        .product-card {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .product-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 32px;
          overflow: hidden;
          background: #F8F8F8;
          margin-bottom: 1rem;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 0.5rem;
        }

        .product-title {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
        }

        .product-price {
          font-size: 16px;
          font-weight: 800;
          color: #B38A36;
        }

        .empty-state {
          text-align: center;
          padding: 6rem 0;
          color: #888;
        }

        .empty-icon {
          margin-bottom: 1.5rem;
          opacity: 0.2;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
        }

        .empty-desc {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .browse-btn {
          display: inline-block;
          background: #1A1A1A;
          color: white;
          padding: 1rem 2rem;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: background 0.3s;
        }

        .browse-btn:hover {
          background: #B38A36;
        }
      `}} />

      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> HOME
      </Link>

      <h1 className="page-title">Your Favourites</h1>

      {likedItems.length === 0 ? (
        <div className="empty-state">
          <Heart size={64} className="empty-icon" />
          <h2 className="empty-title">No favourites yet</h2>
          <p className="empty-desc">You haven't added any accessories to your favourites list.</p>
          <Link href="/accessories" className="browse-btn">Browse Accessories</Link>
        </div>
      ) : (
        <div className="products-grid">
          {likedItems.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image-wrap">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <button 
                  style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', cursor: 'pointer', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  onClick={() => toggleLike(item)}
                >
                  <Trash2 size={18} color="red" />
                </button>
              </div>
              <div className="product-details">
                <span className="product-title">{item.title}</span>
                <span className="product-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
