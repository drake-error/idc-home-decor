"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Plus, Trash2, FileText, Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { accessoriesData } from "../accessoriesData";
import { isAdmin, getAccessoriesByCategory, addAccessory, removeAccessory, uploadFile, AccessoryItemDB } from "../../../lib/api";
import { useWishlist } from "../../../lib/useWishlist";

export default function DedicatedAccessoryPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const unwrappedParams = use(params);
  const accessoryId = unwrappedParams.item;
  
  const categoryData = accessoriesData.find((item) => item.id === accessoryId);
  const { liked, toggleLike } = useWishlist();

  const [dbItems, setDbItems] = useState<AccessoryItemDB[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newItemFile, setNewItemFile] = useState<File | null>(null);

  useEffect(() => {
    if (!categoryData) return;
    const fetchAdminAndData = async () => {
      const admin = await isAdmin();
      setAdminMode(admin);
      const items = await getAccessoriesByCategory(accessoryId);
      setDbItems(items);
    };
    fetchAdminAndData();
  }, [accessoryId, categoryData]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemFile || isUploading) return;
    setIsUploading(true);
    
    try {
      const img_url = await uploadFile(newItemFile);
      if (img_url) {
        await addAccessory({ category: accessoryId, name: "", img_url });
        const items = await getAccessoriesByCategory(accessoryId);
        setDbItems(items);
        setNewItemFile(null);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      console.error("Failed to add accessory:", err);
      alert("Failed to save: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (id: string) => {
    await removeAccessory(id);
    const items = await getAccessoriesByCategory(accessoryId);
    setDbItems(items);
  };

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
          background: transparent;
          border-radius: 32px;
          padding: 0;
          border: none;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .product-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 32px;
          overflow: hidden;
          background: transparent;
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

      {adminMode && (
        <form onSubmit={handleAdd} style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>File (Image or PDF)</label>
            <input type="file" accept="image/*,.pdf" style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '6px' }} onChange={e => setNewItemFile(e.target.files?.[0] || null)} required />
          </div>
          <button type="submit" disabled={isUploading} style={{ padding: '0.75rem 1.5rem', background: '#000', color: 'white', border: 'none', borderRadius: '6px', cursor: isUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Add Accessory</>}
          </button>
        </form>
      )}

      <div className="products-grid">
        {dbItems.map((item) => {
          const isPdf = item.img_url.toLowerCase().includes('.pdf');
          
          if (isPdf) {
            return (
              <div className="product-card" key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: '#FAF9F6', border: '1px solid #EAEAEA', cursor: 'pointer', position: 'relative' }} onClick={() => window.open(item.img_url, '_blank')}>
                <FileText size={48} color="#523825" style={{ marginBottom: '1rem' }} />
                <h3 className="product-name" style={{ textAlign: 'center' }}>{item.name}</h3>
                <p className="product-price" style={{ marginTop: '0.5rem' }}>PDF Catalog</p>
                {adminMode && (
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }} style={{ position: 'absolute', top: 10, right: 10, color: 'red' }}>
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            );
          }

          return (
            <div className="product-card" key={item.id}>
              <div className="product-image-wrap">
                <Image
                  src={item.img_url}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '32px' }}
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              {adminMode && (
                <button className="icon-btn" onClick={() => handleRemove(item.id)} style={{ position: 'absolute', top: 10, right: 10, color: 'red', background: 'transparent', border: 'none', zIndex: 10 }}>
                  <Trash2 size={24} color="red" />
                </button>
              )}
              <button 
                style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}
                onClick={() => toggleLike({ id: item.id, title: item.name, price: 'Premium Accessory', img: item.img_url })}
              >
                <Heart 
                  size={24} 
                  fill={liked[item.id] ? "var(--text-accent)" : "none"} 
                  color={liked[item.id] ? "var(--text-accent)" : "#888"} 
                />
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
}
