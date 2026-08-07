import { useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import { PRODUCTS } from './data/catalog';
import { ShopTheLook } from './components/ShopTheLook';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { AvantGardeButton } from './components/Button';


function App() {


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

      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
      />

      <main className="w-full" id="home">
        <Hero />
        
        <ProductGrid
          filteredProducts={filteredProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedPrice={setSelectedPrice}
          setSearchQuery={setSearchQuery}
          getCardImage={getCardImage}
          formatPrice={formatPrice}
          handleSelectCardImage={handleSelectCardImage}
          setQuickViewProduct={setQuickViewProduct}
          setQuickViewActiveImg={setQuickViewActiveImg}
          setQuickViewSize={setQuickViewSize}
          setQuickViewColor={setQuickViewColor}
          getSelectedSize={getSelectedSize}
          handleSelectCardSize={handleSelectCardSize}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
        />

        <ShopTheLook />
      </main>

      
      <QuickViewModal
        quickViewProduct={quickViewProduct}
        setQuickViewProduct={setQuickViewProduct}
        quickViewActiveImg={quickViewActiveImg}
        setQuickViewActiveImg={setQuickViewActiveImg}
        quickViewSize={quickViewSize}
        setQuickViewSize={setQuickViewSize}
        quickViewColor={quickViewColor}
        formatPrice={formatPrice}
        handleAddToCart={handleAddToCart}
      />

      
      <SizeGuideModal
        isSizeGuideOpen={isSizeGuideOpen}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />

      
      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        cartSubtotal={cartSubtotal}
        formatPrice={formatPrice}
        setIsCheckoutOpen={setIsCheckoutOpen}
        setCheckoutStep={setCheckoutStep}
      />

      
      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        handleCheckoutSubmit={handleCheckoutSubmit}
        formatPrice={formatPrice}
        cartSubtotal={cartSubtotal}
        cart={cart}
        setCart={setCart}
      />

      <Footer 
        setSelectedPrice={setSelectedPrice}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />
    </div>
  );
}

export default App;
