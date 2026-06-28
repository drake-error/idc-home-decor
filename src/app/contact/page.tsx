import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
           <span className="text-brand-orange uppercase tracking-[0.3em] font-medium text-xs mb-4 block">Get In Touch</span>
           <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight">Let's craft your <br/>dream space.</h1>
           <p className="text-gray-500 font-light text-lg mb-12">Whether you are building a new home, renovating a commercial property, or looking for bespoke furniture, our team of experts is here to help.</p>
           
           <div className="space-y-8">
             <div className="flex items-start gap-4">
               <div className="w-12 h-12 bg-orange-50 rounded flex items-center justify-center flex-shrink-0 text-brand-orange">
                 <Phone className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-serif font-bold text-xl text-brand-dark mb-1">Phone / WhatsApp</h3>
                 <p className="text-gray-500 text-sm mb-1">+1 (555) 123-4567</p>
                 <a href="#" className="text-brand-orange text-sm font-medium hover:underline">Message us on WhatsApp</a>
               </div>
             </div>
             
             <div className="flex items-start gap-4">
               <div className="w-12 h-12 bg-orange-50 rounded flex items-center justify-center flex-shrink-0 text-brand-orange">
                 <Mail className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-serif font-bold text-xl text-brand-dark mb-1">Email Us</h3>
                 <p className="text-gray-500 text-sm">info@idchomedecor.com</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="w-12 h-12 bg-orange-50 rounded flex items-center justify-center flex-shrink-0 text-brand-orange">
                 <MapPin className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-serif font-bold text-xl text-brand-dark mb-1">Studio Location</h3>
                 <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">123 Luxury Avenue, Design District, New York, NY 10001</p>
                 <a href="#" className="text-brand-orange text-sm font-medium hover:underline mt-2 inline-block">View on Google Maps</a>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-white border border-gray-100 p-10 md:p-14 rounded-sm shadow-xl shadow-gray-200/50">
          <h2 className="font-serif text-3xl font-bold text-brand-dark mb-8">Book a Consultation</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-dark">First Name</label>
                <input type="text" className="w-full bg-brand-lightGrey border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 px-4 py-3 outline-none transition-all rounded-sm" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-dark">Last Name</label>
                <input type="text" className="w-full bg-brand-lightGrey border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 px-4 py-3 outline-none transition-all rounded-sm" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Email Address</label>
              <input type="email" className="w-full bg-brand-lightGrey border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 px-4 py-3 outline-none transition-all rounded-sm" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Service Required</label>
              <select className="w-full bg-brand-lightGrey border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 px-4 py-3 outline-none transition-all rounded-sm text-gray-500">
                <option>Full Interior Design</option>
                <option>Wallpapers & Curtains</option>
                <option>Custom Furniture</option>
                <option>Flooring</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark">Project Details</label>
              <textarea rows={4} className="w-full bg-brand-lightGrey border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 px-4 py-3 outline-none transition-all rounded-sm" placeholder="Tell us about your space and requirements..."></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-dark text-white px-8 py-4 font-medium hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 rounded-sm mt-4">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
