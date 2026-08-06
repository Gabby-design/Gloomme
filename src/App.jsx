import { useState, useEffect } from 'react';
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

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
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

      {/* Top Announcement Bar */}
      <div style={{ background: 'var(--gold-gradient)', color: '#000', padding: '6px 16px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.05em' }}>
        FREE COMPLIMENTARY EXPRESS DELIVERY ACROSS NIGERIA ON ORDERS OVER ₦70,000
      </div>

      {/* Header & Navigation */}
      <header className="site-header">
        <div className="nav-inner">
          <a href="#home" className="brand-logo" aria-label="Klasik Wardrobe Home">
            <KlasikLogo height={44} className="header-logo" fill={theme === 'dark' ? '#ffffff' : '#0f172a'} />
          </a>

          {/* Search Box */}
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search t-shirts, fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button
              className={`theme-toggle-switch ${theme}`}
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              <span className="toggle-track">
                <span className="toggle-icon sun">☀️</span>
                <span className="toggle-icon moon">🌙</span>
                <span className="toggle-thumb" />
              </span>
              <span className="toggle-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
            <button className="filter-btn" onClick={() => setIsSizeGuideOpen(true)}>
              Size Guide
            </button>
            <button className="cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
              <span>BAG</span>
              <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content" id="home">
        {/* Streamlined Catalog Top Header */}
        <section className="catalog-hero-banner">
          <div className="catalog-banner-info">
            <div className="collection-badge">
              <span>✦</span> HEAVYWEIGHT T-SHIRT COLLECTION
            </div>
            <h1 className="catalog-hero-title">
              Luxury Streetwear & <span className="text-gold">Heavyweight</span> T-Shirts
            </h1>
            <p className="catalog-hero-desc">
              Select your T-shirt below to purchase. Fast delivery across Nigeria • Transparent Pricing: ₦30,000 | ₦35,000 | ₦40,000
            </p>
          </div>

          <div className="quick-tier-pills">
            <button className={`tier-chip ${selectedPrice === 'ALL' ? 'active' : ''}`} onClick={() => setSelectedPrice('ALL')}>
              All T-Shirts ({PRODUCTS.length})
            </button>
            <button className={`tier-chip ${selectedPrice === '30000' ? 'active' : ''}`} onClick={() => setSelectedPrice('30000')}>
              💎 ₦30,000 Essential
            </button>
            <button className={`tier-chip ${selectedPrice === '35000' ? 'active' : ''}`} onClick={() => setSelectedPrice('35000')}>
              🔥 ₦35,000 Signature
            </button>
            <button className={`tier-chip ${selectedPrice === '40000' ? 'active' : ''}`} onClick={() => setSelectedPrice('40000')}>
              👑 ₦40,000 Executive
            </button>
          </div>
        </section>

        {/* Filter Bar & Product Catalog */}
        <section id="catalog" style={{ scrollMarginTop: '100px' }}>
          <div className="filter-bar">
            {/* Price Filter */}
            <div className="filter-group">
              <span className="filter-label">Filter Price:</span>
              <button
                className={`filter-btn ${selectedPrice === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedPrice('ALL')}
              >
                All Prices
              </button>
              <button
                className={`filter-btn ${selectedPrice === '30000' ? 'active' : ''}`}
                onClick={() => setSelectedPrice('30000')}
              >
                ₦30,000 Tier
              </button>
              <button
                className={`filter-btn ${selectedPrice === '35000' ? 'active' : ''}`}
                onClick={() => setSelectedPrice('35000')}
              >
                ₦35,000 Tier
              </button>
              <button
                className={`filter-btn ${selectedPrice === '40000' ? 'active' : ''}`}
                onClick={() => setSelectedPrice('40000')}
              >
                ₦40,000 Tier
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <span className="filter-label">Collection:</span>
              <button
                className={`filter-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('ALL')}
              >
                All Collections
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'Essential' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Essential')}
              >
                Essential (₦30k)
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'Signature' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Signature')}
              >
                Signature (₦35k)
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'Executive' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Executive')}
              >
                Executive (₦40k)
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
                <h3>No t-shirts match your search criteria</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  Try adjusting your price tier filter or search term.
                </p>
                <button
                  className="btn-primary"
                  style={{ marginTop: '20px' }}
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
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-box">
                    <img
                      src={getCardImage(product)}
                      onError={(e) => {
                        e.target.src = product.fallbackImage;
                      }}
                      alt={product.title}
                    />
                    <span className="price-tag-pill">{formatPrice(product.price)}</span>
                    {product.tag && <span className="badge-tag">{product.tag}</span>}

                    {/* Multi-angle Image Thumbnails */}
                    {product.gallery && product.gallery.length > 1 && (
                      <div className="card-image-thumbs">
                        {product.gallery.map((imgUrl, i) => {
                          const isActive = getCardImage(product) === imgUrl;
                          const labels = ['Front', 'Back', 'Fit'];
                          return (
                            <button
                              key={i}
                              type="button"
                              className={`img-thumb-btn ${isActive ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectCardImage(product.id, imgUrl);
                              }}
                              title={`View ${labels[i] || 'Angle'}`}
                            >
                              <img src={imgUrl} alt={`${labels[i]} preview`} />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div className="quick-view-overlay">
                      <button
                        className="btn-quick-view"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewActiveImg(product.image);
                          setQuickViewSize(getSelectedSize(product.id));
                          setQuickViewColor(product.colors[0]?.name || '');
                        }}
                      >
                        📷 View Gallery & Specs
                      </button>
                    </div>
                  </div>

                  <div className="product-details">
                    <div className="product-category">{product.category} Collection — {product.gsm}</div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.description}</p>

                    <div className="card-options">
                      <div className="card-size-selector">
                        <span className="size-label">Select Size:</span>
                        <div className="size-pills">
                          {product.sizes.map((s) => {
                            const isSelected = getSelectedSize(product.id) === s;
                            return (
                              <button
                                key={s}
                                type="button"
                                className={`size-pill ${isSelected ? 'active' : ''}`}
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

                      <div className="color-dots">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="color-dot"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="card-action-row">
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(product, getSelectedSize(product.id))}
                      >
                        🛒 Add to Bag
                      </button>
                      <button
                        className="btn-buy-now"
                        onClick={() => handleBuyNow(product)}
                      >
                        ⚡ Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* T-Shirt Visual Gallery Showcase */}
        <section className="section-title-box" style={{ marginTop: '70px' }}>
          <div className="collection-badge">✦ VISUAL GALLERY SHOWCASE</div>
          <h2>T-Shirt Fit & Fabric Gallery</h2>
        </section>

        <div className="lookbook-grid">
          <div className="lookbook-card">
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop" alt="Noir Organic Fit" />
            <div className="lookbook-overlay">
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff' }}>Essential 240 GSM Noir</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-gold)' }}>₦30,000 Tier — Heavyweight Fit</p>
            </div>
          </div>
          <div className="lookbook-card">
            <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" alt="Acid Wash Detail" />
            <div className="lookbook-overlay">
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff' }}>Signature Acid Wash</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-gold)' }}>₦35,000 Tier — Vintage Distressed</p>
            </div>
          </div>
          <div className="lookbook-card">
            <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop" alt="Mulberry Silk Tailored Fit" />
            <div className="lookbook-overlay">
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff' }}>Executive Cotton-Silk</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-gold)' }}>₦40,000 Tier — Gold Hem Tag</p>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <section className="section-title-box" style={{ marginTop: '80px' }}>
          <p style={{ color: 'var(--text-gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Client Reviews
          </p>
          <h2>Trusted by Fashion Connoisseurs</h2>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ color: '#f5c518', fontSize: '1.1rem', marginBottom: '12px' }}>
                {'★'.repeat(rev.rating)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.6' }}>
                “{rev.comment}”
              </p>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-main)' }}>{rev.name}</strong>
                <small style={{ color: 'var(--text-muted)' }}>{rev.role}</small>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setQuickViewProduct(null)}>
              ✕
            </button>
            <div className="modal-grid">
              <div className="modal-image-col">
                <img
                  src={quickViewActiveImg || quickViewProduct.image}
                  onError={(e) => {
                    e.target.src = quickViewProduct.fallbackImage;
                  }}
                  alt={quickViewProduct.title}
                />
                {quickViewProduct.gallery && (
                  <div className="modal-gallery-thumbs" style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
                    {quickViewProduct.gallery.map((imgUrl, idx) => {
                      const isCurrent = (quickViewActiveImg || quickViewProduct.image) === imgUrl;
                      return (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Angle ${idx + 1}`}
                          style={{
                            width: '54px',
                            height: '54px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: isCurrent ? '2px solid var(--gold-primary)' : '1px solid var(--surface-border)',
                            opacity: isCurrent ? 1 : 0.6,
                          }}
                          onClick={() => setQuickViewActiveImg(imgUrl)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="modal-details-col">
                <div>
                  <span className="badge-tag">{quickViewProduct.category} Collection</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: '8px', fontSize: '1.5rem' }}>
                    {quickViewProduct.title}
                  </h2>
                  <div className="modal-price">{formatPrice(quickViewProduct.price)}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {quickViewProduct.description}
                  </p>

                  <div className="specs-list">
                    <div className="specs-item">
                      <span>✓ Weight:</span> {quickViewProduct.gsm}
                    </div>
                    <div className="specs-item">
                      <span>✓ Material:</span> {quickViewProduct.material}
                    </div>
                    <div className="specs-item">
                      <span>✓ Silhouette:</span> {quickViewProduct.fit}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div style={{ margin: '18px 0' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>
                      SELECT SIZE:
                    </label>
                    <div className="size-pills">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          className={`size-pill ${quickViewSize === s ? 'active' : ''}`}
                          style={{ width: '38px', height: '38px', fontSize: '0.85rem' }}
                          onClick={() => setQuickViewSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '16px' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct, quickViewSize, quickViewColor);
                    setQuickViewProduct(null);
                  }}
                >
                  Add {quickViewSize} to Bag — {formatPrice(quickViewProduct.price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="modal-backdrop" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '640px', padding: '36px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsSizeGuideOpen(false)}>
              ✕
            </button>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
              Klassic Size Architecture
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Our t-shirts are tailored with an intentional oversized dropped-shoulder silhouette. Choose your exact size for a relaxed streetwear drape, or size down for a slim fit.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border-strong)', color: 'var(--text-gold)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Size</th>
                  <th style={{ padding: '12px' }}>Chest (Inches)</th>
                  <th style={{ padding: '12px' }}>Length (Inches)</th>
                  <th style={{ padding: '12px' }}>Shoulder Drop</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '12px', fontWeight: 800 }}>S</td>
                  <td style={{ padding: '12px' }}>40" - 42"</td>
                  <td style={{ padding: '12px' }}>28.5"</td>
                  <td style={{ padding: '12px' }}>2.0" Drop</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '12px', fontWeight: 800 }}>M</td>
                  <td style={{ padding: '12px' }}>43" - 45"</td>
                  <td style={{ padding: '12px' }}>29.5"</td>
                  <td style={{ padding: '12px' }}>2.2" Drop</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '12px', fontWeight: 800 }}>L</td>
                  <td style={{ padding: '12px' }}>46" - 48"</td>
                  <td style={{ padding: '12px' }}>30.5"</td>
                  <td style={{ padding: '12px' }}>2.5" Drop</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '12px', fontWeight: 800 }}>XL</td>
                  <td style={{ padding: '12px' }}>49" - 51"</td>
                  <td style={{ padding: '12px' }}>31.5"</td>
                  <td style={{ padding: '12px' }}>2.8" Drop</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: 800 }}>XXL</td>
                  <td style={{ padding: '12px' }}>52" - 54"</td>
                  <td style={{ padding: '12px' }}>32.5"</td>
                  <td style={{ padding: '12px' }}>3.0" Drop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>YOUR SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlignment: 'center', margin: 'auto 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛍️</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Your Bag is Currently Empty</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
                    Add one of our ₦30,000, ₦35,000, or ₦40,000 heavyweight t-shirts to proceed.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                    <div className="cart-item-img">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <div>
                        <div className="cart-item-title">{item.title}</div>
                        <div className="cart-item-meta">
                          Size: <strong>{item.size}</strong> | Color: {item.color}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="cart-item-price">{formatPrice(item.price * item.quantity)}</div>
                        <div className="cart-qty-controls">
                          <button className="qty-btn" onClick={() => updateCartQty(idx, -1)}>
                            -
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateCartQty(idx, 1)}>
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
              <div className="drawer-footer">
                <div className="free-shipping-progress">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span>
                      {cartSubtotal >= 70000
                        ? '🎉 You unlocked Free Express Delivery!'
                        : `Add ${formatPrice(70000 - cartSubtotal)} more for Free Express Delivery`}
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${Math.min(100, (cartSubtotal / 70000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>{cartSubtotal >= 70000 ? 'FREE' : '₦2,500'}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total Due</span>
                  <span>{formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))}</span>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '16px' }}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                    setCheckoutStep('FORM');
                  }}
                >
                  Proceed to Checkout — {formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '600px', padding: '36px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsCheckoutOpen(false)}>
              ✕
            </button>

            {checkoutStep === 'FORM' ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '6px' }}>
                  Klassic Order Checkout
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Enter your shipping address in Nigeria for express dispatch.
                </p>

                <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Babatunde Ogunlesi"
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        required
                        placeholder="yourname@gmail.com"
                        value={customerForm.email}
                        onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="form-input"
                        required
                        placeholder="+234 800 000 0000"
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Street address, apartment or suite"
                      value={customerForm.address}
                      onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>City / State</label>
                      <select
                        className="form-input"
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

                    <div className="form-group">
                      <label>Payment Method</label>
                      <select
                        className="form-input"
                        value={customerForm.paymentMethod}
                        onChange={(e) => setCustomerForm({ ...customerForm, paymentMethod: e.target.value })}
                      >
                        <option value="PAY_ON_DELIVERY">Pay on Delivery (Lagos/Abuja)</option>
                        <option value="CARD">Debit Card / Bank Transfer</option>
                        <option value="WHATSAPP">Direct WhatsApp Order</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} type="submit">
                    Confirm & Place Order ({formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))})
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-gold)' }}>
                  Order Confirmed!
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px', lineHeight: '1.6' }}>
                  Thank you, <strong>{customerForm.name}</strong>! Your order for Klassic Wardrobe t-shirts has been successfully logged. We will contact you at <strong>{customerForm.phone}</strong> for dispatch confirmation.
                </p>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--surface-border)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'left',
                    marginBottom: '24px',
                    fontSize: '0.88rem',
                  }}
                >
                  <div style={{ color: 'var(--text-gold)', fontWeight: 800, marginBottom: '8px' }}>
                    ORDER RECEIPT SUMMARY:
                  </div>
                  {cart.map((i) => (
                    <div key={`${i.id}-${i.size}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>
                        {i.quantity}x {i.title} ({i.size})
                      </span>
                      <span>{formatPrice(i.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                    <span>Total Amount</span>
                    <span>{formatPrice(cartSubtotal + (cartSubtotal >= 70000 ? 0 : 2500))}</span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => {
                    setCart([]);
                    setIsCheckoutOpen(false);
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <a href="#home" className="brand-logo" style={{ marginBottom: '16px', display: 'inline-block' }} aria-label="Klasik Wardrobe Home">
              <KlasikLogo height={50} className="footer-logo gold-version" fill="#f3c649" />
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '320px', lineHeight: '1.6' }}>
              Luxury streetwear & heavyweight t-shirts engineered with organic cotton and mulberry silk. Transparent pricing at ₦30,000, ₦35,000, and ₦40,000.
            </p>
          </div>

          <div className="footer-col">
            <h4>Collections</h4>
            <div className="footer-links">
              <a href="#catalog" onClick={() => setSelectedPrice('30000')}>Essential (₦30,000)</a>
              <a href="#catalog" onClick={() => setSelectedPrice('35000')}>Signature (₦35,000)</a>
              <a href="#catalog" onClick={() => setSelectedPrice('40000')}>Executive (₦40,000)</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSizeGuideOpen(true); }}>Size Architecture Chart</a>
              <a href="#">Express Delivery Policy</a>
              <a href="#">Return & Exchange Policy</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>HQs & Contact</h4>
            <div className="footer-links">
              <span>Victoria Island, Lagos</span>
              <a href="mailto:concierge@klassicwardrobe.com">concierge@klassicwardrobe.com</a>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer">WhatsApp Concierge</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Klassic Wardrobe Nigeria. All rights reserved. Built with precision.
        </div>
      </footer>
    </div>
  );
}

export default App;
