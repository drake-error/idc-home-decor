import { useState, useEffect } from 'react';

export function useWishlist() {
  const [liked, setLiked] = useState<Record<string | number, boolean>>({});

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

  const toggleLike = (id: string | number) => {
    const saved = localStorage.getItem('idc_wishlist');
    let current: Record<string | number, boolean> = {};
    if (saved) {
       try { current = JSON.parse(saved); } catch (e) {}
    }
    const newLiked = { ...current, [id]: !current[id] };
    if (!newLiked[id]) {
      delete newLiked[id];
    }
    
    localStorage.setItem('idc_wishlist', JSON.stringify(newLiked));
    window.dispatchEvent(new Event('wishlist_updated'));
    setLiked(newLiked);
  };

  const likedCount = Object.keys(liked).length;

  return { liked, toggleLike, likedCount };
}
