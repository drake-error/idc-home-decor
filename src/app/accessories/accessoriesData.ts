export type AccessoryItem = {
  id: string;
  name: string;
  images: string[];
};

export const accessoriesData: AccessoryItem[] = [
  {
    id: "pufy",
    name: "Pufy",
    images: [
      "/images/accessories/acc_pouf_1.png",
      "/images/accessories/acc_pouf_2.png",
      "/images/accessories/acc_pouf_3.png"
    ]
  },
  {
    id: "pillows",
    name: "Pillows",
    images: [
      "/images/accessories/acc_pillow_1.png",
      "/images/accessories/acc_pillow_2.png",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "tables",
    name: "Tables",
    images: [
      "/images/accessories/acc_tables_1.png",
      "/images/accessories/acc_tables_2.png",
      "/images/accessories/acc_tables_3.png"
    ]
  },
  {
    id: "carpets",
    name: "Carpets",
    images: [
      "/images/accessories/acc_carpets_1.png",
      "/images/accessories/acc_carpets_2.png",
      "/images/accessories/acc_carpets_3.png"
    ]
  },
  {
    id: "mattresses",
    name: "Mattresses",
    images: [
      "/images/accessories/acc_mattresses_1.png",
      "/images/accessories/acc_mattresses_2.png",
      "/images/accessories/acc_mattresses_3.png"
    ]
  },
  {
    id: "dining-tables",
    name: "Dining Tables",
    images: [
      "/images/accessories/acc_dining_1.png",
      "/images/accessories/acc_dining_2.png",
      "/images/accessories/acc_dining_3.png"
    ]
  },
  {
    id: "chairs",
    name: "Chairs",
    images: [
      "/images/accessories/acc_chairs_1.png",
      "/images/accessories/acc_chairs_2.png",
      "/images/accessories/acc_chairs_3.png"
    ]
  },
  {
    id: "headboards",
    name: "Headboards",
    images: [
      "/images/accessories/ph_headboard_1.jpg",
      "/images/accessories/ph_headboard_2.jpg",
      "/images/accessories/ph_headboard_3.jpg"
    ]
  },
  {
    id: "grass",
    name: "Artificial Grass",
    images: [
      "/images/accessories/ph_grass_1.jpg",
      "/images/accessories/ph_grass_2.jpg",
      "/images/accessories/ph_grass_3.jpg"
    ]
  },
  {
    id: "canvas",
    name: "Canvas Frames",
    images: [
      "/images/accessories/ph_canvas_1.jpg",
      "/images/accessories/ph_canvas_2.jpg",
      "/images/accessories/ph_canvas_3.jpg"
    ]
  },
  {
    id: "glass",
    name: "Glass Films",
    images: [
      "/images/accessories/ph_glass_1.jpg",
      "/images/accessories/ph_glass_2.jpg",
      "/images/accessories/ph_glass_3.jpg"
    ]
  },
  {
    id: "blankets",
    name: "Blankets",
    images: [
      "/images/accessories/ph_blanket_1.jpg",
      "/images/accessories/ph_blanket_2.jpg",
      "/images/accessories/ph_blanket_3.jpg"
    ]
  },
  {
    id: "mandir",
    name: "Pooja Mandir",
    images: [
      "/images/accessories/mandir_slice_1.jpg",
      "/images/accessories/mandir_slice_2.jpg",
      "/images/accessories/mandir_slice_3.jpg"
    ]
  }
];

export const featuredProducts = [
  { id: 1, cat: "pufy", title: "Velvet Minimalist Pufy", sub: "Premium Seating", price: "₹2,500", img: accessoriesData[0].images[0] },
  { id: 2, cat: "pillows", title: "Silk Throw Pillow", sub: "Hand-stitched detailing", price: "₹850", img: accessoriesData[1].images[0] },
  { id: 3, cat: "tables", title: "Marble Side Table", sub: "Brushed gold finish", price: "₹12,999", img: accessoriesData[2].images[0] },
  { id: 4, cat: "carpets", title: "Hand-woven Rug", sub: "Luxury textures", price: "₹8,500", img: accessoriesData[3].images[0] },
];
