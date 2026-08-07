import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './index.css';

// Product Catalog aligned with ₦30,000, ₦35,000, and ₦40,000 pricing structure
const PRODUCTS = [
  {
    id: 'kwt-01',
    title: 'Klassic Essential Heavyweight Noir Tee',
    price: 30000,
    category: 'Essential',
    tag: 'Best Seller',
    rating: 4.9,
    reviews: 84,
    description: 'Crafted from 240 GSM 100% combed organic cotton. Designed with a dropped shoulder silhouette and reinforced collar.',
    gsm: '240 GSM Heavyweight',
    material: '100% Combed Organic Cotton',
    fit: 'Oversized Drop-Shoulder',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0c' },
      { name: 'Charcoal Grey', hex: '#27272a' },
    ],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'kwt-02',
    title: 'Klassic Signature Acid-Wash Vintage Tee',
    price: 35000,
    category: 'Signature',
    tag: 'Limited Drop',
    rating: 5.0,
    reviews: 62,
    description: 'Hand-dyed vintage acid wash tee with subtle distressing at sleeve cuffs. Features silicone Klassic chest insignia.',
    gsm: '260 GSM Vintage Wash',
    material: 'Custom Washed Heavy Cotton',
    fit: 'Boxy Vintage Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Slate', hex: '#3f3f46' },
      { name: 'Faded Ash', hex: '#71717a' },
    ],
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'kwt-03',
    title: 'Klassic Executive Monogram Silk-Blend Tee',
    price: 40000,
    category: 'Executive',
    tag: 'Luxury Tier',
    rating: 5.0,
    reviews: 110,
    description: 'Ultra-luxurious cotton-silk blend finished with an engraved 18K gold-plated metallic hem tag. Tailored drape.',
    gsm: '280 GSM Silk-Cotton Blend',
    material: '80% Organic Cotton, 20% Mulberry Silk',
    fit: 'Tailored Luxury Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Raw Cream', hex: '#fef3c7' },
      { name: 'Imperial Gold', hex: '#d4af37' },
      { name: 'Midnight Noir', hex: '#18181b' },
    ],
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'kwt-04',
    title: 'Klassic Urban Graphic Oversized Tee',
    price: 30000,
    category: 'Essential',
    tag: 'New Arrival',
    rating: 4.8,
    reviews: 45,
    description: 'Minimalist high-density puff print graphics on the back. Breathable, preshrunk organic cotton built to withstand daily wear.',
    gsm: '240 GSM Heavy Cotton',
    material: '100% Combed Cotton',
    fit: 'Relaxed Streetwear Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Snow White', hex: '#fafafa' },
      { name: 'Onyx Black', hex: '#141418' },
    ],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'kwt-05',
    title: 'Klassic Signature Distressed Olive Crew Tee',
    price: 35000,
    category: 'Signature',
    tag: 'Trending',
    rating: 4.9,
    reviews: 73,
    description: 'Earth-toned double-dyed olive green t-shirt with subtle raw cut edges and double-stitched collar binding.',
    gsm: '260 GSM Heavy Knit',
    material: '100% Ring-Spun Cotton',
    fit: 'Structured Boxy Fit',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Olive', hex: '#2d372e' },
      { name: 'Espresso Brown', hex: '#281c19' },
    ],
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'kwt-06',
    title: 'Klassic Executive Sovereign Monogram Tee',
    price: 40000,
    category: 'Executive',
    tag: 'Exclusive',
    rating: 5.0,
    reviews: 92,
    description: 'Handcrafted luxury tee featuring subtle gold foil monogram embroidery and custom serial-numbered brand tag.',
    gsm: '300 GSM Heavy Silk Blend',
    material: 'Mercerized Cotton & Silk',
    fit: 'Royal Cut Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Gold Noir', hex: '#121218' },
      { name: 'Champagne Cream', hex: '#fdf6e2' },
    ],
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
    fallbackImage: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    ],
  },
];

const REVIEWS = [
  {
    name: 'Tunde Bakare',
    role: 'Fashion Stylist, Victoria Island',
    comment: 'The 280 GSM silk-blend tee at ₦40,000 is unbelievable value. The drape and gold tag detail put it on par with European luxury houses.',
    rating: 5,
  },
  {
    name: 'Chinedu Eze',
    role: 'Creative Director',
    comment: 'Klassic Wardrobe got the drop-shoulder cut spot on. ₦30,000 for a 240 GSM organic cotton shirt that stays crisp after 20 washes is rare.',
    rating: 5,
  },
  {
    name: 'Amina Yusuf',
    role: 'Brand Designer',
    comment: 'Ordered the ₦35,000 Vintage Acid Wash. The texture, feel, and packaging arrived in less than 24 hours in Lagos. Superb execution!',
    rating: 5,
  },
];

// Klasik Wardrobe Iconic Streetwear Logo Component
function KlasikLogo({ height = 48, className = '', fill = 'currentColor' }) {
  return (
    <svg
      className={`klasik-brand-logo ${className}`}
      height={height}
      viewBox="0 0 420 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <g transform="translate(210, 90) rotate(-9) translate(-210, -90)">
        {/* Top-Left Bracket & Speed Marks */}
        <path d="M 42 28 L 42 62 M 42 28 L 78 28" stroke={fill} strokeWidth="4" strokeLinecap="square" />
        <path d="M 54 18 L 98 18" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />

        {/* Top-Right Speed Marks */}
        <path d="M 235 22 L 310 18" stroke={fill} strokeWidth="3" strokeLinecap="round" />
        <path d="M 255 12 L 335 8" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />

        {/* KLASIK Text */}
        <text
          x="205"
          y="76"
          textAnchor="middle"
          fontFamily="'Impact', 'Arial Black', 'Montserrat', 'Trebuchet MS', sans-serif"
          fontWeight="900"
          fontSize="70"
          fill={fill}
          letterSpacing="3"
        >
          KLASIK
        </text>

        {/* WARDROBE Text */}
        <text
          x="205"
          y="136"
          textAnchor="middle"
          fontFamily="'Impact', 'Arial Black', 'Montserrat', 'Trebuchet MS', sans-serif"
          fontWeight="900"
          fontSize="52"
          fill={fill}
          letterSpacing="1.5"
        >
          WARDROBE
        </text>

        {/* Bottom-Left Speed Marks */}
        <path d="M 68 152 L 132 152" stroke={fill} strokeWidth="3" strokeLinecap="round" />
        <path d="M 78 162 L 122 162" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />

        {/* Bottom-Right Bracket & Speed Marks */}
        <path d="M 185 142 L 358 142 L 358 115" stroke={fill} strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M 370 128 L 370 156 M 345 156 L 370 156" stroke={fill} strokeWidth="4" strokeLinecap="square" />
        <path d="M 325 168 L 378 168" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 338 176 L 370 176" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function AvantGardeButton({ children, onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden bg-transparent text-foreground border border-foreground font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 transition-colors duration-300 group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 bg-foreground z-0"
        variants={{
          initial: { scaleY: 0, transformOrigin: 'bottom' },
          hover: { scaleY: 1, transformOrigin: 'bottom' }
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10 group-hover:text-background transition-colors duration-300">
        {children}
      </span>
    </motion.button>
  );
}

function App() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const starRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('L');
  const [quickViewColor, setQuickViewColor] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('FORM');
  const [toasts, setToasts] = useState([]);
  const [selectedCardSizes, setSelectedCardSizes] = useState({});
  const [cardActiveImages, setCardActiveImages] = useState({});
  const [quickViewActiveImg, setQuickViewActiveImg] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lagos',
    paymentMethod: 'PAY_ON_DELIVERY',
  });

  const getSelectedSize = (productId) => selectedCardSizes[productId] || 'L';

  const handleSelectCardSize = (productId, size) => {
    setSelectedCardSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const getCardImage = (product) => cardActiveImages[product.id] || product.image;

  const handleSelectCardImage = (productId, imgUrl) => {
    setCardActiveImages((prev) => ({ ...prev, [productId]: imgUrl }));
  };

  // Format currency helper
  const formatPrice = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  // Toast Trigger
  const addToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Add to cart helper
  const handleAddToCart = (product, size = 'L', color = null) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            size: size,
            color: chosenColor,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });

    addToast(`Added "${product.title}" (${size}) to your bag!`);
  };

  // Instant Buy Now handler
  const handleBuyNow = (product) => {
    const size = getSelectedSize(product.id);
    handleAddToCart(product, size);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Cart Qty Adjuster
  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  // Cart Subtotal
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesPrice = selectedPrice === 'ALL' || p.price === Number(selectedPrice);
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPrice && matchesCategory && matchesSearch;
  });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('SUCCESS');
  };

  return (
    <div className="app-container">
      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>✨</span>
            <div>{t.msg}</div>
          </div>
        ))}
      </div>

      {/* Fixed Navigation Container */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        {/* Top Announcement Bar */}
        <div className="bg-foreground text-background px-4 py-2 text-center text-xs font-medium tracking-[0.15em] uppercase">
          FREE COMPLIMENTARY EXPRESS DELIVERY ACROSS NIGERIA ON ORDERS OVER ₦70,000
        </div>

        {/* Header & Navigation */}
        <header className="w-full bg-background/90 backdrop-blur-md border-b border-foreground/10 px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <a href="#home" className="" aria-label="Klasik Wardrobe Home">
              <KlasikLogo height={44} className="fill-foreground" />
            </a>

            {/* Search Box */}
            <div className="hidden md:flex items-center border border-foreground/20 px-3 py-1.5 focus-within:border-foreground transition-colors w-64">
              <span className="text-sm mr-2 opacity-50">🔍</span>
              <input
                type="text"
                className="bg-transparent border-none outline-none text-sm w-full font-sans"
                placeholder="Search t-shirts, fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Nav Actions */}
            <div className="flex items-center gap-6">
              <button className="text-xs uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity" onClick={() => setIsSizeGuideOpen(true)}>
                Size Guide
              </button>
              <button className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium hover:opacity-70 transition-opacity" onClick={() => setIsCartOpen(true)}>
                <span>BAG</span>
                <span className="bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <main className="w-full" id="home">
        {/* Editorial Hero Banner */}
        <section className="relative w-full h-[90vh] overflow-hidden">
          <motion.video
            style={{ scale: heroScale }}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2000&auto=format&fit=crop"
          >
            {/* Using a placeholder fashion video from a reliable source */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-red-dress-41619-large.mp4" type="video/mp4" />
          </motion.video>

          {/* Rotating 4-Point Star */}
          <motion.div
            className="absolute top-1/4 right-12 md:right-32 z-20 text-foreground"
            style={{ rotate: starRotate }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z" />
            </svg>
          </motion.div>
          <div className="absolute bottom-12 left-6 md:bottom-20 md:left-20 z-50 text-left text-white mix-blend-difference max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-6"
            >
              Defined by details.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-sans text-[0.9rem] tracking-[0.25em] uppercase font-medium"
            >
              Elevated essentials crafted from premium heavyweight cotton and silk blends.
            </motion.p>
          </div>
        </section>

        {/* Filter Bar */}
        <section id="catalog" className="scroll-mt-[100px] max-w-[1400px] mx-auto px-6 pt-12">
          <div className="flex justify-center mb-12 w-full">

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              <span className="font-serif text-sm tracking-[0.2em] uppercase text-foreground/50 mr-2">COLLECTION</span>
              <button
                className={`text-xs uppercase tracking-[0.1em] pb-1 border-b transition-all duration-300 ${selectedCategory === 'ALL' ? 'border-foreground text-foreground font-medium' : 'border-transparent text-foreground/70 hover:text-foreground'}`}
                onClick={() => setSelectedCategory('ALL')}
              >
                All
              </button>
              <button
                className={`text-xs uppercase tracking-[0.1em] pb-1 border-b transition-all duration-300 ${selectedCategory === 'Essential' ? 'border-foreground text-foreground font-medium' : 'border-transparent text-foreground/70 hover:text-foreground'}`}
                onClick={() => setSelectedCategory('Essential')}
              >
                Essential
              </button>
              <button
                className={`text-xs uppercase tracking-[0.1em] pb-1 border-b transition-all duration-300 ${selectedCategory === 'Signature' ? 'border-foreground text-foreground font-medium' : 'border-transparent text-foreground/70 hover:text-foreground'}`}
                onClick={() => setSelectedCategory('Signature')}
              >
                Signature
              </button>
              <button
                className={`text-xs uppercase tracking-[0.1em] pb-1 border-b transition-all duration-300 ${selectedCategory === 'Executive' ? 'border-foreground text-foreground font-medium' : 'border-transparent text-foreground/70 hover:text-foreground'}`}
                onClick={() => setSelectedCategory('Executive')}
              >
                Executive
              </button>
            </div>
          </div>
        </section>

        {/* Vertical Product Gallery */}
        <section className="relative bg-background px-6 max-w-[1400px] mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10"
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20 px-5">
                <h3 className="font-serif text-2xl text-foreground font-normal">No essentials match your criteria.</h3>
                <p className="text-foreground/60 mt-3 text-sm tracking-[0.05em]">
                  Please try adjusting your filter or search term.
                </p>
                <button
                  className="mt-6 text-xs uppercase tracking-[0.1em] pb-1 border-b border-foreground text-foreground font-medium transition-opacity hover:opacity-70"
                  onClick={() => {
                    setSelectedPrice('ALL');
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="relative group flex flex-col w-full"
                >
                  <div className="relative w-full overflow-hidden bg-transparent mb-4 shadow-premium-diffused h-[500px] md:h-[600px]">
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      src={getCardImage(product)}
                      onError={(e) => {
                        e.target.src = product.fallbackImage;
                      }}
                      alt={product.title}
                      className="w-full h-full object-cover origin-center"
                    />
                    <span className="absolute top-4 right-4 bg-background/90 backdrop-blur-md text-foreground px-3 py-1 font-serif text-sm tracking-[0.05em] border border-foreground/10">{formatPrice(product.price)}</span>
                    {product.tag && <span className="absolute top-4 left-4 bg-foreground text-background px-2 py-0.5 text-[0.65rem] font-sans uppercase tracking-[0.2em] font-semibold">{product.tag}</span>}

                    {/* Multi-angle Image Thumbnails */}
                    {product.gallery && product.gallery.length > 1 && (
                      <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                        {product.gallery.map((imgUrl, i) => {
                          const isActive = getCardImage(product) === imgUrl;
                          const labels = ['Front', 'Back', 'Fit'];
                          return (
                            <button
                              key={i}
                              type="button"
                              className={`w-10 h-10 overflow-hidden border transition-all ${isActive ? 'border-foreground opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-foreground/50'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectCardImage(product.id, imgUrl);
                              }}
                              title={`View ${labels[i] || 'Angle'}`}
                            >
                              <img src={imgUrl} alt={`${labels[i]} preview`} className="w-full h-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                      <AvantGardeButton
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewActiveImg(product.image);
                          setQuickViewSize(getSelectedSize(product.id));
                          setQuickViewColor(product.colors[0]?.name || '');
                        }}
                      >
                        📷 View Gallery & Specs
                      </AvantGardeButton>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60 mb-2">{product.category} Collection — {product.gsm}</div>
                    <h3 className="font-serif text-lg tracking-[0.02em] font-medium leading-snug mb-1">{product.title}</h3>
                    <p className="font-sans text-sm text-foreground/70 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col gap-2">
                        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60">Select Size:</span>
                        <div className="flex gap-2">
                          {product.sizes.map((s) => {
                            const isSelected = getSelectedSize(product.id) === s;
                            return (
                              <button
                                key={s}
                                type="button"
                                className={`w-8 h-8 flex items-center justify-center border font-sans text-xs transition-all ${isSelected ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-foreground border-foreground/20 hover:border-foreground'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectCardSize(product.id, s);
                                }}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex gap-2 self-end pb-1">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-4 h-4 rounded-none border border-foreground/10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <AvantGardeButton
                        className="w-full"
                        onClick={() => handleAddToCart(product, getSelectedSize(product.id))}
                      >
                        🛒 Add to Bag
                      </AvantGardeButton>
                      <AvantGardeButton
                        className="w-full"
                        onClick={() => handleBuyNow(product)}
                      >
                        ⚡ Buy Now
                      </AvantGardeButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </section>

        {/* Shop the Look Editorial Section */}
        <section className="relative w-full max-w-7xl mx-auto px-6 py-24 border-t border-foreground/10 flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop" alt="Shop the look editorial" className="w-full h-[80vh] object-cover" />
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-background p-4 border border-foreground/10 shadow-sm z-10 font-serif text-lg tracking-[0.02em]">Look 01 — The Essential Utility</div>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col gap-12 md:pl-10">
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[0.9]">Shop The Look</h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 group"
            >
              <div className="w-32 h-40 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop" alt="T-Shirt" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-xl tracking-[0.02em]">Essential 240 GSM Noir</h3>
                <span className="font-sans text-sm tracking-[0.1em] text-foreground/60">₦30,000</span>
                <AvantGardeButton className="self-start mt-2">Add to Bag</AvantGardeButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 group md:ml-12"
            >
              <div className="w-32 h-40 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop" alt="Pants" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-xl tracking-[0.02em]">Executive Cotton-Silk</h3>
                <span className="font-sans text-sm tracking-[0.1em] text-foreground/60">₦40,000</span>
                <AvantGardeButton className="self-start mt-2">Add to Bag</AvantGardeButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setQuickViewProduct(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-background border border-foreground/10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-background/50 backdrop-blur-md text-foreground font-sans text-xl border border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300" onClick={() => setQuickViewProduct(null)}>
              ✕
            </button>
            <div className="flex w-full flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative bg-foreground/5 p-4 md:p-8 flex flex-col items-center justify-center">
                <img
                  src={quickViewActiveImg || quickViewProduct.image}
                  onError={(e) => {
                    e.target.src = quickViewProduct.fallbackImage;
                  }}
                  alt={quickViewProduct.title}
                  className="w-full max-w-sm h-auto object-cover"
                />
                {quickViewProduct.gallery && (
                  <div className="flex gap-2 mt-8 justify-center">
                    {quickViewProduct.gallery.map((imgUrl, idx) => {
                      const isCurrent = (quickViewActiveImg || quickViewProduct.image) === imgUrl;
                      return (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Angle ${idx + 1}`}
                          className={`w-14 h-14 object-cover cursor-pointer transition-all ${isCurrent ? 'border border-foreground opacity-100' : 'border border-foreground/20 opacity-60 hover:opacity-100'}`}
                          onClick={() => setQuickViewActiveImg(imgUrl)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="flex-1">
                  <span className="bg-foreground text-background font-sans text-[0.65rem] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 inline-block mb-4">{quickViewProduct.category} Collection</span>
                  <h2 className="font-serif text-3xl md:text-4xl tracking-[-0.02em] font-bold mb-2">
                    {quickViewProduct.title}
                  </h2>
                  <div className="font-sans text-lg text-foreground/80 mb-6">{formatPrice(quickViewProduct.price)}</div>
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-8">
                    {quickViewProduct.description}
                  </p>

                  <div className="flex flex-col gap-3 font-sans text-xs tracking-[0.05em] text-foreground/80 mb-8 border-y border-foreground/10 py-6">
                    <div>
                      <span className="font-bold mr-2 uppercase tracking-[0.1em]">Weight:</span> {quickViewProduct.gsm}
                    </div>
                    <div>
                      <span className="font-bold mr-2 uppercase tracking-[0.1em]">Material:</span> {quickViewProduct.material}
                    </div>
                    <div>
                      <span className="font-bold mr-2 uppercase tracking-[0.1em]">Silhouette:</span> {quickViewProduct.fit}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-8">
                    <label className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 mb-3">
                      SELECT SIZE:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          className={`w-12 h-12 flex items-center justify-center border font-sans text-sm transition-all ${quickViewSize === s ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-foreground border-foreground/20 hover:border-foreground'}`}
                          onClick={() => setQuickViewSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] py-4 border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-[700ms]"
                  onClick={() => {
                    handleAddToCart(quickViewProduct, quickViewSize, quickViewColor);
                    setQuickViewProduct(null);
                  }}
                >
                  Add {quickViewSize} to Bag — {formatPrice(quickViewProduct.price)}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setIsSizeGuideOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-background border border-foreground/10 p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-foreground font-sans text-xl hover:opacity-50 transition-opacity" onClick={() => setIsSizeGuideOpen(false)}>
              ✕
            </button>
            <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] mb-3">
              Klassic Size Architecture
            </h2>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-8">
              Our t-shirts are tailored with an intentional oversized dropped-shoulder silhouette. Choose your exact size for a relaxed streetwear drape, or size down for a slim fit.
            </p>

            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b border-foreground/20 text-foreground/60 uppercase tracking-[0.1em] text-xs">
                  <th className="py-4 font-semibold">Size</th>
                  <th className="py-4 font-semibold">Chest (Inches)</th>
                  <th className="py-4 font-semibold">Length (Inches)</th>
                  <th className="py-4 font-semibold">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10 text-foreground/80">
                <tr className="hover:bg-foreground/5 transition-colors">
                  <td className="py-4 font-bold text-foreground">S</td>
                  <td className="py-4">40" - 42"</td>
                  <td className="py-4">28.5"</td>
                  <td className="py-4">2.0" Drop</td>
                </tr>
                <tr className="hover:bg-foreground/5 transition-colors">
                  <td className="py-4 font-bold text-foreground">M</td>
                  <td className="py-4">43" - 45"</td>
                  <td className="py-4">29.5"</td>
                  <td className="py-4">2.2" Drop</td>
                </tr>
                <tr className="hover:bg-foreground/5 transition-colors">
                  <td className="py-4 font-bold text-foreground">L</td>
                  <td className="py-4">46" - 48"</td>
                  <td className="py-4">30.5"</td>
                  <td className="py-4">2.5" Drop</td>
                </tr>
                <tr className="hover:bg-foreground/5 transition-colors">
                  <td className="py-4 font-bold text-foreground">XL</td>
                  <td className="py-4">49" - 51"</td>
                  <td className="py-4">31.5"</td>
                  <td className="py-4">2.8" Drop</td>
                </tr>
                <tr className="hover:bg-foreground/5 transition-colors">
                  <td className="py-4 font-bold text-foreground">XXL</td>
                  <td className="py-4">52" - 54"</td>
                  <td className="py-4">32.5"</td>
                  <td className="py-4">3.0" Drop</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      )}

      {/* Cart Drawer */}
      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-foreground/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-background border-l border-foreground/10 h-full flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-foreground/10 bg-background z-10">
              <h3 className="font-serif text-lg tracking-[-0.02em] font-semibold">YOUR SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
              <button
                className="text-foreground hover:opacity-50 transition-opacity font-sans text-xl"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                  <div className="text-5xl mb-4">🛍️</div>
                  <h4 className="font-serif text-xl mb-2">Your Bag is Currently Empty</h4>
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                    Add one of our ₦30,000, ₦35,000, or ₦40,000 heavyweight t-shirts to proceed.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 border-b border-foreground/5 pb-6">
                    <div className="w-24 h-32 flex-shrink-0 bg-foreground/5">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="font-serif text-base font-semibold leading-tight mb-1">{item.title}</div>
                        <div className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-foreground/60">
                          Size: <strong className="text-foreground">{item.size}</strong> | Color: {item.color}
                        </div>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <div className="font-sans text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                        <div className="flex items-center gap-3 border border-foreground/20 px-2 py-1">
                          <button className="text-foreground/50 hover:text-foreground transition-colors px-1" onClick={() => updateCartQty(idx, -1)}>
                            -
                          </button>
                          <span className="font-sans text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button className="text-foreground/50 hover:text-foreground transition-colors px-1" onClick={() => updateCartQty(idx, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-foreground/10 bg-background/90 backdrop-blur-md">
                <div className="mb-6">
                  <div className="flex justify-between font-sans text-[0.7rem] uppercase tracking-[0.1em] font-semibold mb-2">
                    <span>
                      {cartSubtotal >= 70000
                        ? '🎉 You unlocked Free Express Delivery!'
                        : `Add ${formatPrice(70000 - cartSubtotal)} more for Free Express Delivery`}
                    </span>
                  </div>
                  <div className="h-1 bg-foreground/10 w-full overflow-hidden">
                    <div
                      className="h-full bg-foreground transition-all duration-500"
                      style={{ width: `${Math.min(100, (cartSubtotal / 70000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6 font-sans text-sm">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Estimated Shipping</span>
                    <span>{cartSubtotal >= 70000 ? 'FREE' : '₦2,500'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t border-foreground/10">
                    <span>Total Due</span>
                    <span>{formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] py-4 border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-[700ms]"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                    setCheckoutStep('FORM');
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setIsCheckoutOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-background border border-foreground/10 p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-foreground font-sans text-xl hover:opacity-50 transition-opacity" onClick={() => setIsCheckoutOpen(false)}>
              ✕
            </button>

            {checkoutStep === 'FORM' ? (
              <>
                <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] mb-2">
                  Klassic Order Checkout
                </h2>
                <p className="font-sans text-sm text-foreground/70 mb-8">
                  Enter your shipping address in Nigeria for express dispatch.
                </p>

                <form className="flex flex-col gap-6" onSubmit={handleCheckoutSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                      required
                      placeholder="e.g. Babatunde Ogunlesi"
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                        required
                        placeholder="yourname@gmail.com"
                        value={customerForm.email}
                        onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                        required
                        placeholder="+234 800 000 0000"
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">Delivery Address</label>
                    <input
                      type="text"
                      className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                      required
                      placeholder="Street address, apartment or suite"
                      value={customerForm.address}
                      onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">City / State</label>
                      <select
                        className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none"
                        value={customerForm.city}
                        onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                      >
                        <option value="Lagos">Lagos State</option>
                        <option value="Abuja">Abuja FCT</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Ibadan">Ibadan</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs uppercase tracking-[0.1em] font-semibold text-foreground/60">Payment Method</label>
                      <select
                        className="w-full bg-foreground/5 border border-foreground/20 text-foreground font-sans px-4 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none"
                        value={customerForm.paymentMethod}
                        onChange={(e) => setCustomerForm({ ...customerForm, paymentMethod: e.target.value })}
                      >
                        <option value="PAY_ON_DELIVERY">Pay on Delivery (Lagos/Abuja)</option>
                        <option value="CARD">Debit Card / Bank Transfer</option>
                        <option value="WHATSAPP">Direct WhatsApp Order</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] py-4 mt-4 border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-[700ms]" type="submit">
                    Confirm & Place Order ({formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))})
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="font-serif text-3xl font-bold mb-4">
                  Order Confirmed!
                </h2>
                <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-8">
                  Thank you, <strong className="text-foreground">{customerForm.name}</strong>! Your order for Klassic Wardrobe t-shirts has been successfully logged. We will contact you at <strong className="text-foreground">{customerForm.phone}</strong> for dispatch confirmation.
                </p>

                <div className="bg-foreground/5 border border-foreground/10 p-6 text-left mb-8 font-sans text-sm">
                  <div className="font-bold text-xs uppercase tracking-[0.1em] mb-4">
                    ORDER RECEIPT SUMMARY:
                  </div>
                  {cart.map((i) => (
                    <div key={`${i.id}-${i.size}`} className="flex justify-between mb-2">
                      <span>
                        {i.quantity}x {i.title} ({i.size})
                      </span>
                      <span>{formatPrice(i.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-foreground/10 mt-4 pt-4 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>{formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] py-4 border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-[700ms]"
                  onClick={() => {
                    setCart([]);
                    setIsCheckoutOpen(false);
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
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
    </div>
  );
}

export default App;
