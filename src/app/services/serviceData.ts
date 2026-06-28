export type Subcategory = {
  id: string;
  name: string;
  type: "pdf" | "image";
  desc?: string;
  img?: string;
};

export type ServiceData = {
  title: string;
  subcategories: Subcategory[];
};

export const serviceConfig: Record<string, ServiceData> = {
  wallpapers: {
    title: "Wallpapers",
    subcategories: [
      { 
        id: "customized-wallpaper",
        name: "CUSTOMIZED WALLPAPER", 
        type: "image",
        desc: "BEAUTIFUL DESIGNS FOR YOUR WALLS",
        img: "/images/sub_wallpaper.png"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/service_wallpapers.png"
      },
    ],
  },
  curtains: {
    title: "Curtains",
    subcategories: [
      { id: "100-blackout", name: "100% BLACKOUT", type: "pdf", desc: "MAXIMUM LIGHT BLOCKAGE", img: "/images/service_curtains.png" },
      { id: "main", name: "MAIN CURTAINS", type: "pdf", desc: "ELEGANT MAIN FABRICS", img: "/images/service_curtains.png" },
      { id: "sheer", name: "SHEER CURTAINS", type: "pdf", desc: "DELICATE LIGHT FILTERING", img: "/images/service_curtains.png" },
    ],
  },
  blinds: {
    title: "Blinds",
    subcategories: [
      { id: "vertical", name: "VERTICAL BLINDS", type: "pdf", desc: "SLEEK VERTICAL DESIGNS", img: "/images/service_blinds.png" },
      { id: "zebra", name: "ZEBRA BLINDS", type: "pdf", desc: "MODERN STRIPED BLINDS", img: "/images/service_blinds.png" },
      { id: "roller", name: "ROLLER BLINDS", type: "pdf", desc: "MINIMALIST ROLLER SHADES", img: "/images/service_blinds.png" },
      { id: "customize", name: "CUSTOMIZE BLINDS", type: "pdf", desc: "TAILOR-MADE FOR YOU", img: "/images/service_blinds.png" },
      { id: "wooden", name: "WOODEN BLINDS", type: "pdf", desc: "NATURAL WOOD FINISHES", img: "/images/service_blinds.png" },
      { id: "pvc", name: "PVC BLINDS", type: "pdf", desc: "DURABLE PVC OPTIONS", img: "/images/service_blinds.png" },
      { id: "roman", name: "ROMAN BLINDS", type: "pdf", desc: "CLASSIC ROMAN SHADES", img: "/images/service_blinds.png" },
    ],
  },
  flooring: {
    title: "Flooring",
    subcategories: [
      { id: "wooden", name: "WOODEN FLOORINGS", type: "pdf", desc: "PREMIUM WOOD PANELS", img: "/images/service_flooring.png" },
      { id: "vinyl", name: "VINYL FLOORINGS", type: "pdf", desc: "DURABLE VINYL PLANKS", img: "/images/service_flooring.png" },
    ],
  },
  sofas: {
    title: "Sofas",
    subcategories: [
      { 
        id: "customized",
        name: "CUSTOMIZED SOFAS", 
        type: "image",
        desc: "BESPOKE SEATING OPTIONS",
        img: "/images/sub_sofa.png"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/service_sofas.png"
      },
    ],
  },
  cot: {
    title: "Cot",
    subcategories: [
      { 
        id: "customized",
        name: "CUSTOMIZED COT", 
        type: "image",
        desc: "LUXURIOUS BED FRAMES",
        img: "/images/sub_cot.png"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/service_cot.png"
      },
    ],
  },
};
