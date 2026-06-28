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
        img: "/images/sub_customized_wallpaper.jpeg"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/wallpaper catalouge.jpeg"
      },
    ],
  },
  curtains: {
    title: "Curtains",
    subcategories: [
      { id: "100-blackout", name: "100% BLACKOUT", type: "pdf", desc: "MAXIMUM LIGHT BLOCKAGE", img: "/images/service_100 percent blackout curtains.jpeg" },
      { id: "main", name: "MAIN CURTAINS", type: "pdf", desc: "ELEGANT MAIN FABRICS", img: "/images/service_main curtain.jpeg" },
      { id: "sheer", name: "SHEER CURTAINS", type: "pdf", desc: "DELICATE LIGHT FILTERING", img: "/images/service_sheer curtain.jpeg" },
    ],
  },
  blinds: {
    title: "Blinds",
    subcategories: [
      { id: "vertical", name: "VERTICAL BLINDS", type: "pdf", desc: "SLEEK VERTICAL DESIGNS", img: "/images/sub_vertical blind.jpeg" },
      { id: "zebra", name: "ZEBRA BLINDS", type: "pdf", desc: "MODERN STRIPED BLINDS", img: "/images/sub_zebra blinds.jpeg" },
      { id: "roller", name: "ROLLER BLINDS", type: "pdf", desc: "MINIMALIST ROLLER SHADES", img: "/images/sub_roller blinds.jpeg" },
      { id: "customize", name: "CUSTOMIZE BLINDS", type: "pdf", desc: "TAILOR-MADE FOR YOU", img: "/images/customized blinds.jpg.jpeg" },
      { id: "wooden", name: "WOODEN BLINDS", type: "pdf", desc: "NATURAL WOOD FINISHES", img: "/images/sub_wodden blinds.jpeg" },
      { id: "pvc", name: "PVC BLINDS", type: "pdf", desc: "DURABLE PVC OPTIONS", img: "/images/sub_pvs blinds.jpeg" },
      { id: "roman", name: "ROMAN BLINDS", type: "pdf", desc: "CLASSIC ROMAN SHADES", img: "/images/sub_roman blinds.jpeg" },
    ],
  },
  flooring: {
    title: "Flooring",
    subcategories: [
      { id: "wooden", name: "WOODEN FLOORINGS", type: "pdf", desc: "PREMIUM WOOD PANELS", img: "/images/sub_wooden flooring.jpeg" },
      { id: "vinyl", name: "VINYL FLOORINGS", type: "pdf", desc: "DURABLE VINYL PLANKS", img: "/images/sub_vinyl flooring.jpeg" },
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
        img: "/images/sub_customized sofa.jpeg"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/sub_sofa catalouge .jpeg"
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
        img: "/images/service_cot.jpeg"
      },
      { 
        id: "catalogues",
        name: "CATALOGUES", 
        type: "pdf",
        desc: "EXPLORE OUR PDF COLLECTIONS",
        img: "/images/service_cot.jpeg"
      },
    ],
  },
};
