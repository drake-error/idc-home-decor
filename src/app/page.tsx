"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, ArrowRight, User, AlertCircle, X, Plus, Trash2 } from "lucide-react";
import { isAdmin, getNewArrivals, addNewArrival, removeNewArrival, uploadFile, NewArrivalItem } from "../lib/api";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);

  const [newArrivals, setNewArrivals] = useState<NewArrivalItem[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newItemFile, setNewItemFile] = useState<File | null>(null);

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const admin = await isAdmin();
      setAdminMode(admin);
      const arrivals = await getNewArrivals();
      
      if (arrivals.length === 0 && !admin) {
        setNewArrivals([
          { id: '1', name: "Arm Sofas", price: "$45.80", img_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop" },
          { id: '2', name: "Arm Sofas", price: "$45.80", img_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop" },
          { id: '3', name: "Arm Sofas", price: "$45.80", img_url: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=600&auto=format&fit=crop" },
          { id: '4', name: "Arm Sofas", price: "$45.80", img_url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop" },
          { id: '5', name: "Modern Sofa", price: "$120.00", img_url: "/images/luxury_sofa_modern.png" },
          { id: '6', name: "Coffee Table", price: "$85.00", img_url: "/images/luxury_coffee_table.png" },
          { id: '7', name: "Armchair", price: "$95.00", img_url: "/images/luxury_armchair.png" }
        ]);
      } else {
        setNewArrivals(arrivals);
      }
    };
    checkAdminAndFetch();
  }, []);

  const handleAddArrival = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemFile || isUploading) return;
    setIsUploading(true);
    
    try {
      const img_url = await uploadFile(newItemFile);
      if (img_url) {
        await addNewArrival({ name: "", price: "", img_url });
        const updated = await getNewArrivals();
        setNewArrivals(updated);
        setNewItemFile(null);
        // Reset file input via form reset
        (e.target as HTMLFormElement).reset();
      }
    } catch (err: any) {
      console.error("Failed to add arrival:", err);
      alert("Failed to save: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveArrival = async (id: string) => {
    // Prevent trying to delete mock items
    if (id.length < 10) return;
    await removeNewArrival(id);
    const updated = await getNewArrivals();
    setNewArrivals(updated);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchError(false);
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return;

      const searchMap: Record<string, string[]> = {
        '/services/wallpapers': ['wallpaper', 'wallpapers', 'wall paper', 'customized wallpaper', 'catalogues'],
        '/services/curtains': ['curtain', 'curtains', 'blackout', 'sheer', 'main curtains'],
        '/services/blinds': ['blind', 'blinds', 'vertical', 'zebra', 'roller', 'wooden blinds', 'pvc', 'roman'],
        '/services/flooring': ['floor', 'flooring', 'wooden flooring', 'vinyl'],
        '/services/sofas': ['sofa', 'sofas', 'couch'],
        '/services/cot': ['cot', 'cots', 'bed', 'beds'],
        '/services': ['service', 'services'],
        '/accessories/pufy': ['pufy', 'pouf', 'poufs', 'puffy', 'puff'],
        '/accessories/pillows': ['pillow', 'pillows', 'cushion'],
        '/accessories/tables': ['table', 'tables', 'side table'],
        '/accessories/carpets': ['carpet', 'carpets', 'rug', 'rugs'],
        '/accessories/mattresses': ['mattress', 'mattresses', 'matress'],
        '/accessories/dining-tables': ['dining', 'dining table', 'dining tables'],
        '/accessories/chairs': ['chair', 'chairs'],
        '/accessories/headboards': ['headboard', 'headboards'],
        '/accessories/grass': ['grass', 'artificial grass', 'lawn'],
        '/accessories/canvas': ['canvas', 'canvas frame', 'frames', 'painting'],
        '/accessories/glass': ['glass', 'glass film', 'films'],
        '/accessories/blankets': ['blanket', 'blankets', 'quilt'],
        '/accessories/mandir': ['mandir', 'pooja', 'pooja mandir', 'temple'],
        '/accessories': ['accessory', 'accessories'],
        '/projects': ['project', 'projects', 'portfolio'],
        '/booking': ['book', 'booking', 'appointment'],
        '/about': ['about', 'about us', 'history'],
        '/contact': ['contact', 'contact us', 'support']
      };

      let matchedRoute = "";
      for (const [route, keywords] of Object.entries(searchMap)) {
        if (keywords.some(k => query === k || query.includes(k))) {
          matchedRoute = route;
          break;
        }
      }

      if (matchedRoute) {
        router.push(matchedRoute);
      } else {
        setSearchError(true);
        setTimeout(() => setSearchError(false), 3000);
      }
    }
  };

  useEffect(() => {
    const handleWinScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleWinScroll);
    return () => window.removeEventListener("scroll", handleWinScroll);
  }, []);

  return (
    <main className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          /* Figma Extracted Tokens */
          --bg-primary: #FCFBFA; /* Primary_03 */
          --bg-secondary: #F8F5F3; /* Secondary_05 */
          --bg-tertiary: #F5F0EA; /* Secondary_04 */
          --text-primary: #000000; /* Primary_01 */
          --text-accent: #523825; /* Primary_02 */
          --text-muted: #A89C93; /* Secondary_02 */
          --border-color: #D0C2B0; /* Secondary_03 */
          --icon-color: #665244; /* Secondary_01 */
          --white: #FFFFFF;
          
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Inter', sans-serif;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          font-family: var(--font-sans);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .page-wrapper {
          overflow-x: hidden;
          width: 100%;
        }
        
        section {
          display: block;
          position: relative;
          width: 100%;
          clear: both;
          box-sizing: border-box;
        }

        /* 1. Header Styles */
        .header-placeholder {
          height: 142px;
          width: 100%;
        }

        .header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          z-index: 100;
          background-color: #FFFFFF;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header-wrapper.scrolled {
          transform: translateY(-79px);
        }

        .header-top-wrapper {
          display: block;
        }

        .header-top-inner {
          overflow: hidden;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5rem 0.5rem 5rem;
          transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .header-top-wrapper.hidden .header-top {
          opacity: 0;
          pointer-events: none;
        }

        .header-left {
          display: flex;
          gap: 2rem;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-accent);
          font-weight: 500;
        }
        
        .header-left a:hover {
          color: var(--text-primary);
        }

        .logo-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #B38A36; /* Dark Gold matching the logo */
          display: flex;
          align-items: center;
          gap: 1.2rem;
          text-shadow: 0px 2px 4px rgba(179, 138, 54, 0.1);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .search-pill {
          display: flex;
          align-items: center;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          padding: 0.6rem 1.25rem;
          transition: border-color 0.3s;
        }
        
        .search-pill:focus-within {
          border-color: var(--text-primary);
        }

        .search-pill input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          margin-left: 0.75rem;
          width: 120px;
          color: var(--text-primary);
          font-family: var(--font-sans);
        }
        
        .search-pill input::placeholder {
          color: var(--text-muted);
        }

        .bag-icon {
          position: relative;
          cursor: pointer;
        }

        .bag-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background-color: var(--text-accent);
          color: var(--white);
          font-size: 10px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .nav-menu {
          display: flex;
          justify-content: center;
          gap: 3.5rem;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.15em;
          padding: 1rem 0;
          margin: 0 5rem;
          border-top: 1px solid rgba(208, 194, 176, 0.3);
          color: var(--text-primary);
          transition: border-color 0.5s ease;
        }

        .nav-menu.scrolled {
          border-top-color: transparent;
        }

        .nav-link {
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--text-primary);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        /* 2. Hero Section */
        .hero-section {
          background-color: var(--bg-secondary);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
          padding: 4rem 6%;
          min-height: calc(100vh - 120px);
          gap: 2rem;
          box-sizing: border-box;
        }

        .hero-left {
          padding-top: 2vh;
        }

        .hero-left h1 {
          font-family: var(--font-serif);
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.15;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0 0 2rem 0;
          color: var(--text-primary);
          max-width: 800px;
          letter-spacing: -0.01em;
        }

        .btn-luxury {
          border: 1px solid var(--text-primary);
          background: transparent;
          padding: 16px 36px;
          cursor: pointer;
          font-size: 14px; /* Button_01 */
          letter-spacing: 4px; 
          text-transform: uppercase;
          font-weight: 500;
          font-family: var(--font-sans);
          display: inline-flex;
          align-items: center;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
        }
        
        .btn-luxury::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: var(--text-primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: -1;
        }
        
        .btn-luxury:hover {
          color: var(--white);
        }
        
        .btn-luxury:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .hero-right {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 1.5rem;
          height: 100%;
          padding-bottom: 0;
        }

        .arch-small {
          width: 25vw;
          max-width: 280px;
          height: 50%;
          border-radius: 500px 500px 0 0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .arch-large {
          width: 32vw;
          max-width: 400px;
          height: 80%;
          border-radius: 500px 500px 0 0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.08);
        }
        
        .img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .arch-small:hover .img-zoom, .arch-large:hover .img-zoom {
          transform: scale(1.05);
        }

        /* 3. Features Ribbon */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #ffffff;
          align-items: start;
          padding: 6rem 6%;
          border-bottom: 1px solid var(--border-color);
        }

        .feature-item {
          padding: 6rem 4rem;
          text-align: center;
          border-right: 1px solid rgba(208, 194, 176, 0.4);
          transition: background-color 0.4s ease;
        }
        
        .feature-item:hover {
          background-color: var(--bg-primary);
        }

        .feature-item:last-child {
          border-right: none;
        }

        .feature-num {
          font-size: 18px; /* Heading_07 */
          color: var(--text-muted);
          font-family: var(--font-serif);
          margin-bottom: 1.5rem;
          display: block;
        }

        .feature-title {
          font-family: var(--font-serif);
          font-size: 32px; /* Heading_05 */
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .feature-desc {
          font-size: 16px; /* Body_02 */
          color: var(--icon-color);
          max-width: 320px;
          margin: 0 auto;
          line-height: 28px;
          font-weight: 400;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: white; width: 90%; max-width: 1200px; max-height: 85vh; border-radius: 20px;
          padding: 3rem; position: relative; overflow-y: auto;
        }
        .modal-close {
          position: absolute; top: 1.5rem; right: 1.5rem; background: #f0f0f0; border: none;
          width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-weight: bold;
          display: flex; align-items: center; justify-content: center;
        }
        .admin-form {
          background: #f9f9f9; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;
          display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;
        }
        .admin-input {
          padding: 0.5rem; border: 1px solid #ccc; border-radius: 6px; font-family: var(--font-sans);
        }
        .admin-btn {
          padding: 0.6rem 1.2rem; background: #000; color: white; border: none; border-radius: 6px; cursor: pointer;
        }
        .admin-remove-btn {
          position: absolute; top: 10px; right: 10px; background: red; color: white; border: none;
          width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;
        }
        
        /* 4. New Arrivals */
        .new-arrivals {
          padding: 8rem 6%;
          background: #F7F4EF;
        }

        .new-arrivals-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 2rem;
          margin-bottom: 5rem;
        }

        .new-arrivals-title {
          font-family: var(--font-serif);
          font-size: 60px; /* Heading_04 */
          font-weight: 500;
          margin: 0;
          color: var(--text-primary);
        }

        .new-arrivals-title sup {
          font-size: 20px; /* Label Big */
          font-family: var(--font-sans);
          color: var(--text-muted);
          margin-left: 0.5rem;
          vertical-align: super;
        }

        .view-all {
          font-size: 14px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          border-bottom: 1px solid var(--text-primary);
          padding-bottom: 6px;
        }
        
        .view-all:hover {
          color: var(--text-accent);
          border-bottom-color: var(--text-accent);
        }

        .products-slider {
          display: flex;
          gap: 3rem;
          overflow-x: auto;
          padding-bottom: 2rem;
          scrollbar-width: none; /* Firefox */
        }
        
        .products-slider::-webkit-scrollbar {
          display: none; /* Safari/Chrome */
        }

        .product-card {
          min-width: 350px;
          cursor: pointer;
          group: relative;
        }

        .product-img-wrap {
          width: 350px;
          height: 420px;
          background: var(--bg-tertiary);
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .product-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-name {
          font-family: var(--font-serif);
          font-size: 24px; /* Heading_06 */
          font-weight: 500;
          margin: 0;
          color: var(--text-primary);
        }

        .product-price {
          font-size: 18px; /* Body_01 */
          color: var(--text-accent);
          font-weight: 400;
        }

        /* 5. Shop By Category */
        .category-section {
          padding: 12rem 8%;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
        }

        .category-arch-left {
          position: relative;
          width: 400px;
          height: 550px;
          border-radius: 500px 500px 0 0;
          overflow: hidden;
          opacity: 0.9;
          flex-shrink: 0;
          transition: transform 0.5s ease;
        }
        
        .category-section:hover .category-arch-left {
          transform: scale(1.02);
        }

        .category-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          flex-grow: 1;
          padding-left: 8%;
          z-index: 10;
        }

        .category-link {
          font-family: var(--font-serif);
          font-size: 72px; /* Heading_02 */
          font-weight: 600;
          color: var(--text-muted);
          line-height: 1.1;
        }

        .category-link:hover, .category-link.active {
          color: var(--text-primary);
        }

        .category-link sup {
          font-size: 16px; /* Label Medium */
          font-family: var(--font-sans);
          font-weight: 400;
          margin-left: 1rem;
          vertical-align: top;
          color: var(--text-muted);
        }

        /* 6. Magazine Text (Display Text) */
        .magazine-section {
          padding: 12rem 8rem;
          background-color: var(--bg-tertiary);
          text-align: center;
        }

        .magazine-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 100px; /* Display Text exact */
          font-weight: 600; /* SemiBold Italic */
          line-height: 128px;
          color: var(--text-primary);
          max-width: 1300px;
          margin: 0 auto;
        }

        .inline-arch {
          display: inline-block;
          vertical-align: middle;
          width: 140px;
          height: 180px;
          border-radius: 500px 500px 0 0;
          margin: 0 1.5rem;
          margin-top: -20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .inline-oblong {
          display: inline-block;
          vertical-align: middle;
          width: 200px;
          height: 100px;
          border-radius: 50px;
          margin: 0 1.5rem;
          margin-top: -10px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* 7. Rooms Section */
        .rooms-section {
          padding: 10rem 8rem;
          background-color: var(--bg-secondary);
          text-align: center;
        }

        .rooms-label {
          font-size: 16px; /* Label Medium */
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 5rem;
          display: block;
          font-weight: 500;
        }

        .rooms-list {
          font-family: var(--font-serif);
          font-size: 72px; /* Heading_02 */
          font-weight: 600;
          line-height: 96px;
          color: var(--text-primary);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          column-gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .rooms-link {
          color: var(--text-primary);
          position: relative;
        }
        
        .rooms-link:hover {
          color: var(--text-accent);
        }

        .rooms-separator {
          font-weight: 300;
          color: var(--text-muted);
        }

        /* 8. Instagram & Footer */
        .instagram-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 6rem 8rem 2rem 8rem;
          background-color: var(--bg-primary);
        }

        .instagram-title {
          font-family: var(--font-serif);
          font-size: 32px; /* Heading_05 */
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .instagram-follow {
          font-size: 16px; /* Label Medium */
          color: var(--icon-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          height: 480px;
          background-color: var(--bg-primary);
        }

        .insta-item {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: var(--bg-tertiary);
        }
        
        .insta-item .img-zoom {
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .insta-item:hover .img-zoom {
          transform: scale(1.1);
        }

        .footer {
          background-color: #0A0A0A;
          color: var(--white);
          padding: 8rem 8rem 3rem 8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-section {
          background-color: #0A0A0A;
          color: var(--white);
          padding: 8rem 5rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-section h2 {
          font-family: var(--font-serif);
          font-size: 70px; /* Heading_03 */
          font-style: italic;
          font-weight: 600;
          line-height: 80px;
          margin-bottom: 4rem;
          text-align: center;
          color: var(--white);
        }

        .footer-newsletter-btn {
          border: 1px solid rgba(255,255,255,0.3);
          color: var(--white);
          padding: 16px 40px;
          font-size: 14px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8rem;
          transition: all 0.4s ease;
        }

        .footer-newsletter-btn:hover {
          background: var(--white);
          color: #0A0A0A;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 5fr 2fr 2fr 3fr;
          gap: 4rem;
          width: 100%;
          max-width: 1400px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 5rem;
          margin-bottom: 6rem;
        }

        .newsletter-col h4 {
          font-size: 12px; /* Label Small */
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .newsletter-input-group {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          max-width: 400px;
        }

        .newsletter-input-group input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--white);
          flex-grow: 1;
          font-size: 16px;
          font-family: var(--font-sans);
        }
        
        .newsletter-input-group input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .newsletter-input-group button {
          background: transparent;
          border: none;
          color: var(--white);
          cursor: pointer;
        }

        .newsletter-terms {
          font-size: 12px; /* Label Small */
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          max-width: 350px;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-links a {
          color: rgba(255,255,255,0.6);
          font-size: 12px; /* Label Small */
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        .footer-links a:hover { 
          color: var(--white); 
        }
        
        .payment-icons {
          display: flex;
          gap: 0.75rem;
          margin-top: 3rem;
        }

        .payment-badge {
          background: var(--white);
          color: #0A0A0A;
          font-size: 10px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 2px;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 2.5rem;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}} />

      <div className="header-placeholder"></div>
      <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className={`header-top-wrapper ${isScrolled ? 'hidden' : ''}`}>
          <div className="header-top-inner">
            <div className="header-top">
              <div className="header-left">
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
              
              <div className="logo-container">
                <div className="logo">
                  <div style={{ position: 'relative', width: '55px', height: '55px' }}>
                    <Image src="/images/idc-logo.png" alt="IDC Logo" fill style={{ objectFit: 'contain' }} />
                  </div>
                  IDC HOME DECOR
                </div>
              </div>
              
              <div className="header-right">
                <div style={{ position: 'relative' }}>
                  <div className="search-pill">
                    <Search size={16} color="var(--icon-color)" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                  </div>
                  {searchError && (
                    <div style={{
                      position: 'absolute',
                      top: '110%',
                      right: '0',
                      background: '#FF3333',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(255, 51, 51, 0.2)',
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <AlertCircle size={14} /> Product/service is not available or invalid
                    </div>
                  )}
                </div>

                <Link href="/login" className="login-icon" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', cursor: 'pointer', color: 'var(--text-primary)', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  <User size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <nav className={`nav-menu ${isScrolled ? 'scrolled' : ''}`}>
          <Link href="/" className="nav-link active">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/booking" className="nav-link">Booking</Link>
          <Link href="/social" className="nav-link">Social Media</Link>
          <Link href="/accessories" className="nav-link">Accessories</Link>
        </nav>
      </div>

      <section className="hero-section">
        <div className="hero-left">
          <h1>WE OFFERING YOU THE <br/>BEST HOME DECOR <br/>PRODUCTS & ITEMS FOR <br/>A DREAM HOME</h1>
          <Link href="/services" className="btn-luxury">
            EXPLORE OUR PRODUCTS
          </Link>
        </div>
        
        <div className="hero-right">
          <div className="arch-small">
            <Image src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=800&auto=format&fit=crop" alt="Small Arch Bedroom" fill className="img-zoom" priority />
          </div>
          <div className="arch-large">
            <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" alt="Large Arch Living Room" fill className="img-zoom" priority />
          </div>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-item">
           <span className="feature-num">01.</span>
           <h3 className="feature-title">Unique & Modren Products</h3>
           <p className="feature-desc">We provide the most unique pieces designed to elevate your living spaces.</p>
        </div>
        <div className="feature-item">
           <span className="feature-num">02.</span>
           <h3 className="feature-title">Expertly Vettted Quality</h3>
           <p className="feature-desc">Every item is checked to meet the highest standards of luxury and durability.</p>
        </div>
        <div className="feature-item">
           <span className="feature-num">03.</span>
           <h3 className="feature-title">Delivery At Your door</h3>
           <p className="feature-desc">Premium white-glove delivery service right to your doorstep for total ease.</p>
        </div>
      </section>

      <section className="new-arrivals">
        <div className="new-arrivals-header">
          <h2 className="new-arrivals-title">New Arrivals <sup>(56)</sup></h2>
          <button onClick={() => setShowModal(true)} className="view-all" style={{background: 'transparent', border: 'none', borderBottom: '1px solid var(--text-primary)', cursor: 'pointer'}}>VIEW ALL</button>
        </div>
        
        <div className="products-slider">
          {newArrivals.slice(0, 4).map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-img-wrap">
                <Image src={item.img_url} alt={item.name} fill className="img-zoom" />
              </div>
              {/* Product info removed as requested */}
            </div>
          ))}
        </div>
      </section>



      <section className="magazine-section">
        <h2 className="magazine-text">
          Transforming
          <div className="inline-arch">
            <Image src="/images/manifesto_arch.png" alt="Luxury Interior Arch" fill className="img-zoom" />
          </div> 
          Houses into Dream 
          <div className="inline-oblong">
            <Image src="/images/manifesto_oblong.png" alt="Luxury Dream Home Oblong" fill className="img-zoom" />
          </div> 
          Homes.
        </h2>
      </section>



      <section className="instagram-section">
        <div className="instagram-header">
          <h3 className="instagram-title">#halallab</h3>
          <div className="instagram-follow">
            <span>FOLLOW US ON INSTAGRAM</span>
          </div>
        </div>
        <div className="instagram-grid">
          <div className="insta-item"><Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" alt="Insta 1" fill className="img-zoom" /></div>
          <div className="insta-item"><Image src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop" alt="Insta 2" fill className="img-zoom" /></div>
          <div className="insta-item"><Image src="https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop" alt="Insta 3" fill className="img-zoom" /></div>
          <div className="insta-item"><Image src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop" alt="Insta 4" fill className="img-zoom" /></div>
        </div>
      </section>

      <footer className="footer-section">
        <h2>We Provide best <br/>handpicked home decor</h2>
        <Link href="#" className="footer-newsletter-btn">GET TO OUR NEWSLETTER</Link>
        
        <div className="footer-grid">
          <div className="newsletter-col">
            <h4>Subscribe To Receive Grape News & Offers</h4>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Your email address" />
              <button><ArrowRight size={20} /></button>
            </div>
            <p className="newsletter-terms">By subscribing you agree to our Terms & Conditions and Privacy & Cookies Policy.</p>
          </div>
          
          <div className="footer-links">
            <Link href="#">Our History</Link>
            <Link href="#">Journal</Link>
            <Link href="#">Wholesale</Link>
            <Link href="#">What We Do</Link>
            <Link href="#">Giving</Link>
          </div>

          <div className="footer-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Returns (CA)</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Return/Exchange</Link>
          </div>

          <div className="footer-links">
            <Link href="#">Pinterest</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Facebook</Link>
            <div className="payment-icons">
              <div className="payment-badge">VISA</div>
              <div className="payment-badge">PAY</div>
              <div className="payment-badge">MC</div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© 2026 IDC HOME DECOR</span>
          <span>DESIGNED WITH PRECISION</span>
        </div>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>All New Arrivals</h2>
            
            {adminMode && (
              <form className="admin-form" onSubmit={handleAddArrival}>
                <div>
                  <label style={{display: 'block', fontSize: '12px', marginBottom: '4px'}}>Select Image</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setNewItemFile(e.target.files?.[0] || null)} required />
                </div>
                <button type="submit" className="admin-btn" disabled={isUploading} style={{ opacity: isUploading ? 0.7 : 1, cursor: isUploading ? 'not-allowed' : 'pointer' }}>
                  {isUploading ? 'Uploading...' : <><Plus size={16} style={{display: 'inline', verticalAlign: 'middle'}}/> Add Arrival</>}
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
              {newArrivals.map(item => (
                <div key={item.id} style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', background: '#f5f5f5' }}>
                    <Image src={item.img_url} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    {adminMode && (
                      <button className="admin-remove-btn" onClick={() => handleRemoveArrival(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  {/* Name and price removed as requested */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}