"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Trash2, Plus, Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { serviceConfig } from "../../serviceData";
import { isAdmin, getServiceItems, addServiceItem, removeServiceItem, uploadFile, ServiceItemDB } from "../../../../lib/api";

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

  const [dbItems, setDbItems] = useState<ServiceItemDB[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newItemFile, setNewItemFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchAdminAndData = async () => {
      const admin = await isAdmin();
      setAdminMode(admin);
      const items = await getServiceItems(category, subcategory);
      setDbItems(items);
    };
    fetchAdminAndData();
  }, [category, subcategory]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemFile || isUploading) return;
    setIsUploading(true);
    
    try {
      const file_url = await uploadFile(newItemFile);
      if (file_url) {
        // Determine type based on extension
        const ext = newItemFile.name.split('.').pop()?.toLowerCase();
        const type = ext === 'pdf' ? 'pdf' : 'image';
        
        await addServiceItem({ 
          category, 
          subcategory, 
          type, 
          name: "", 
          file_url,
          file_size: (newItemFile.size / (1024 * 1024)).toFixed(1) + ' MB'
        });
        const items = await getServiceItems(category, subcategory);
        setDbItems(items);
        setNewItemFile(null);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      console.error("Failed to add service item:", err);
      alert("Failed to save: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (id: string) => {
    await removeServiceItem(id);
    const items = await getServiceItems(category, subcategory);
    setDbItems(items);
  };

  // Separate DB items by type
  const dbImages = dbItems.filter(item => item.type === 'image');
  const dbPdfs = dbItems.filter(item => item.type === 'pdf');

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
          border-radius: 16px;
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
        .pdf-card:hover .pdf-meta {
          color: rgba(250, 249, 246, 0.7);
        }

        /* --- MOBILE OPTIMIZATION --- */
        @media (max-width: 768px) {
          .dedicated-main {
            padding: 2rem 1.5rem 4rem 1.5rem !important;
          }
          
          .back-link {
            font-size: 10px;
          }
          
          .dedicated-header {
            margin-bottom: 2rem;
          }
          
          .dedicated-title {
            font-size: 28px;
          }
          
          .image-grid {
            grid-template-columns: 1fr;
            padding: 0;
          }
          
          .image-card {
            aspect-ratio: 1/1;
          }
          
          .pdf-grid {
            grid-template-columns: 1fr;
          }
          
          .pdf-card {
            padding: 2rem 1rem;
          }
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

      {adminMode && (
        <form onSubmit={handleAdd} style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap', width: '100%', maxWidth: '1400px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase' }}>Select File (Image or PDF)</label>
            <input type="file" accept="image/*,.pdf" style={{ padding: '0.65rem', border: '1px solid #ccc', borderRadius: '6px' }} onChange={e => setNewItemFile(e.target.files?.[0] || null)} required />
          </div>
          <button type="submit" disabled={isUploading} style={{ padding: '0.8rem 1.5rem', background: '#000', color: 'white', border: 'none', borderRadius: '6px', cursor: isUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Add File</>}
          </button>
        </form>
      )}

      {dbImages.length > 0 && (
        <div className="image-grid">
          {dbImages.map(item => (
            <div key={item.id} className="image-card">
              <Image src={item.file_url} alt={item.name} fill sizes="(max-width: 768px) 100vw, 350px" />
              <div className="image-overlay" onClick={() => window.open(item.file_url, '_blank')}>
                <span>View Full Size</span>
              </div>
              {adminMode && (
                <button onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }} style={{ position: 'absolute', top: 10, right: 10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {dbPdfs.length > 0 && (
        <div className="pdf-grid" style={{ marginTop: dbImages.length > 0 ? '4rem' : '0' }}>
          {dbPdfs.map(item => (
            <div key={item.id} className="pdf-card" style={{ position: 'relative' }} onClick={() => window.open(item.file_url, '_blank')}>
              <FileText size={40} className="pdf-icon" strokeWidth={1} />
              <span className="pdf-title">{item.name}</span>
              <span className="pdf-meta">PDF Document • {item.file_size || 'Unknown Size'}</span>
              
              {adminMode && (
                <button onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }} style={{ position: 'absolute', top: 10, right: 10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
