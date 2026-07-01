import { useState, useEffect } from 'react';

export type WishlistItem = {
  id: string | number;
  title: string;
  price: string;
  img: string;
};

export function useWishlist() {
  const [liked, setLiked] = useState<Record<string, WishlistItem>>({});

  useEffect(() => {
    const saved = localStorage.getItem('idc_wishlist');
    if (saved) {
      try {
        setLiked(JSON.parse(saved));
      } catch (e) {}
    }

    const handleStorage = () => {
      const updated = localStorage.getItem('idc_wishlist');
      if (updated) {
        try {
          setLiked(JSON.parse(updated));
        } catch (e) {}
      } else {
        setLiked({});
      }
    };
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('wishlist_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('wishlist_updated', handleStorage);
    };
  }, []);

  const toggleLike = (item: WishlistItem) => {
    const saved = localStorage.getItem('idc_wishlist');
    let current: Record<string, WishlistItem> = {};
    if (saved) {
       try { current = JSON.parse(saved); } catch (e) {}
    }
    const key = String(item.id);
    const newLiked = { ...current };
    
    if (newLiked[key]) {
      delete newLiked[key];
    } else {
      newLiked[key] = item;
    }
    
    localStorage.setItem('idc_wishlist', JSON.stringify(newLiked));
    window.dispatchEvent(new Event('wishlist_updated'));
    setLiked(newLiked);
  };

  const likedCount = Object.keys(liked).length;

  return { liked, toggleLike, likedCount };
}
