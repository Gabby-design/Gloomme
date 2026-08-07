import { KlasikLogo } from './KlasikLogo';

export function Footer({ setSelectedPrice, setIsSizeGuideOpen }) {
  return (
    <footer className="w-full bg-foreground text-background pt-24 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <a href="#home" className="inline-block mb-6 hover:opacity-70 transition-opacity" aria-label="Klasik Wardrobe Home">
            <KlasikLogo height={50} className="w-auto" fill="#F9F8F6" />
          </a>
          <p className="font-sans text-sm text-background/60 leading-relaxed">
            Luxury streetwear & heavyweight t-shirts engineered with organic cotton and mulberry silk. Transparent pricing at ₦30,000, ₦35,000, and ₦40,000.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-lg tracking-[-0.02em] font-semibold">Collections</h4>
          <div className="flex flex-col gap-3 font-sans text-sm text-background/60">
            <a href="#catalog" className="hover:text-background transition-colors" onClick={() => setSelectedPrice('30000')}>Essential (₦30,000)</a>
            <a href="#catalog" className="hover:text-background transition-colors" onClick={() => setSelectedPrice('35000')}>Signature (₦35,000)</a>
            <a href="#catalog" className="hover:text-background transition-colors" onClick={() => setSelectedPrice('40000')}>Executive (₦40,000)</a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-lg tracking-[-0.02em] font-semibold">Customer Care</h4>
          <div className="flex flex-col gap-3 font-sans text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors" onClick={(e) => { e.preventDefault(); setIsSizeGuideOpen(true); }}>Size Architecture Chart</a>
            <a href="#" className="hover:text-background transition-colors">Express Delivery Policy</a>
            <a href="#" className="hover:text-background transition-colors">Return & Exchange Policy</a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-lg tracking-[-0.02em] font-semibold">HQs & Contact</h4>
          <div className="flex flex-col gap-3 font-sans text-sm text-background/60">
            <span>Victoria Island, Lagos</span>
            <a href="mailto:concierge@klassicwardrobe.com" className="hover:text-background transition-colors">concierge@klassicwardrobe.com</a>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="hover:text-background transition-colors">WhatsApp Concierge</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-background/20 pt-8 text-center font-sans text-xs text-background/40 tracking-[0.1em] uppercase">
        © {new Date().getFullYear()} Klassic Wardrobe Nigeria. All rights reserved. Built with precision.
      </div>
    </footer>
  );
}
