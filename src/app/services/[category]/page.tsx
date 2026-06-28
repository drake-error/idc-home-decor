import Link from "next/link";
import { ArrowLeft, FileText, Image as ImageIcon } from "lucide-react";

type ServiceData = {
  title: string;
  subcategories: { name: string; type: "pdf" | "image" }[];
};

const serviceConfig: Record<string, ServiceData> = {
  wallpapers: {
    title: "Wallpapers",
    subcategories: [
      { name: "Customized Wallpaper", type: "image" },
      { name: "Catalogues", type: "pdf" },
    ],
  },
  curtains: {
    title: "Curtains",
    subcategories: [
      { name: "100% BlackOut", type: "pdf" },
      { name: "Main", type: "pdf" },
      { name: "Sheer", type: "pdf" },
    ],
  },
  blinds: {
    title: "Blinds",
    subcategories: [
      { name: "Vertical Blinds", type: "pdf" },
      { name: "Zebra Blinds", type: "pdf" },
      { name: "Roller Blinds", type: "pdf" },
      { name: "Customize Blinds", type: "pdf" },
      { name: "Wooden Blinds", type: "pdf" },
      { name: "PVC Blinds", type: "pdf" },
      { name: "Roman Blinds", type: "pdf" },
    ],
  },
  flooring: {
    title: "Flooring",
    subcategories: [
      { name: "Wooden Floorings", type: "pdf" },
      { name: "Vinyl Floorings", type: "pdf" },
    ],
  },
  sofas: {
    title: "Sofas",
    subcategories: [
      { name: "Customized Sofas", type: "image" },
    ],
  },
  cot: {
    title: "Cot",
    subcategories: [
      { name: "Customized Cot", type: "image" },
    ],
  },
};

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = serviceConfig[category];

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl text-brand-dark mb-6">Service not found</h1>
        <Link href="/services" className="text-brand-orange hover:underline">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors mb-12 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </Link>
      
      <div className="mb-16">
         <span className="text-brand-orange uppercase tracking-[0.3em] font-medium text-xs mb-4 block">Service Category</span>
         <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-6">{data.title}</h1>
         <p className="text-gray-500 max-w-2xl font-light text-lg">Browse our collections and materials for {data.title.toLowerCase()}. Select a subcategory below to view related designs or download catalogues.</p>
      </div>

      <div className="space-y-16">
        {data.subcategories.map((sub, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-sm p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              {sub.type === "pdf" ? (
                <FileText className="w-8 h-8 text-brand-orange" />
              ) : (
                <ImageIcon className="w-8 h-8 text-brand-orange" />
              )}
              <h2 className="font-serif text-2xl font-bold text-brand-dark">{sub.name}</h2>
            </div>

            {sub.type === "pdf" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex flex-col items-center justify-center p-8 bg-brand-lightGrey rounded-sm border border-transparent hover:border-brand-orange cursor-pointer transition-all group">
                    <FileText className="w-12 h-12 text-gray-400 group-hover:text-brand-orange transition-colors mb-4" />
                    <span className="text-sm font-medium text-brand-dark text-center">Catalogue Vol {item}</span>
                    <span className="text-xs text-gray-400 mt-2">PDF • 2.4 MB</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="relative aspect-[4/3] bg-brand-lightGrey rounded-sm overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700">
                       {/* Placeholder for images to be loaded from Supabase */}
                       <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">Design {item}</div>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white font-medium tracking-wider uppercase text-sm">View Details</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
