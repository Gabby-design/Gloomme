import os
import re

app_file = r'c:\Users\Olamide\Documents\klasic\src\App.jsx'

with open(app_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract PRODUCTS and REVIEWS
catalog_code = ""
match_products = re.search(r'(// Product Catalog.*?)const REVIEWS =', content, re.DOTALL)
if match_products:
    catalog_code += match_products.group(1).replace('const PRODUCTS =', 'export const PRODUCTS =')

match_reviews = re.search(r'(const REVIEWS = \[.*?\];)', content, re.DOTALL)
if match_reviews:
    catalog_code += "\n" + match_reviews.group(1).replace('const REVIEWS =', 'export const REVIEWS =')

os.makedirs(r'c:\Users\Olamide\Documents\klasic\src\data', exist_ok=True)
with open(r'c:\Users\Olamide\Documents\klasic\src\data\catalog.js', 'w', encoding='utf-8') as f:
    f.write(catalog_code)

# 2. Extract ShopTheLook
shop_match = re.search(r'({\s*/\*\s*Shop the Look Editorial Section\s*\*/\s*}[\s\S]*?</section>)', content)
if shop_match:
    shop_code = """import { motion } from 'framer-motion';
import { AvantGardeButton } from './Button';

export function ShopTheLook() {
  return (
""" + shop_match.group(1) + """
  );
}
"""
    with open(r'c:\Users\Olamide\Documents\klasic\src\components\ShopTheLook.jsx', 'w', encoding='utf-8') as f:
        f.write(shop_code)

# 3. Extract QuickViewModal
qv_match = re.search(r'({\s*/\*\s*Quick View Modal\s*\*/\s*}[\s\S]*?)(?=\s*{\s*/\*\s*Size Guide Modal)', content)
if qv_match:
    qv_code = """import { motion } from 'framer-motion';

export function QuickViewModal({
  quickViewProduct,
  setQuickViewProduct,
  quickViewActiveImg,
  setQuickViewActiveImg,
  quickViewSize,
  setQuickViewSize,
  quickViewColor,
  formatPrice,
  handleAddToCart
}) {
  if (!quickViewProduct) return null;
  return (
    <>
""" + qv_match.group(1) + """
    </>
  );
}
"""
    with open(r'c:\Users\Olamide\Documents\klasic\src\components\QuickViewModal.jsx', 'w', encoding='utf-8') as f:
        f.write(qv_code)

# 4. Extract SizeGuideModal
sg_match = re.search(r'({\s*/\*\s*Size Guide Modal\s*\*/\s*}[\s\S]*?)(?=\s*{\s*/\*\s*Cart Drawer)', content)
if sg_match:
    sg_code = """import { motion } from 'framer-motion';

export function SizeGuideModal({
  isSizeGuideOpen,
  setIsSizeGuideOpen
}) {
  if (!isSizeGuideOpen) return null;
  return (
    <>
""" + sg_match.group(1) + """
    </>
  );
}
"""
    with open(r'c:\Users\Olamide\Documents\klasic\src\components\SizeGuideModal.jsx', 'w', encoding='utf-8') as f:
        f.write(sg_code)

# 5. Extract CartDrawer
cart_match = re.search(r'({\s*/\*\s*Cart Drawer\s*\*/\s*}[\s\S]*?)(?=\s*{\s*/\*\s*Checkout Modal)', content)
if cart_match:
    cart_code = """import { motion } from 'framer-motion';

export function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  updateCartQty,
  cartSubtotal,
  formatPrice,
  setIsCheckoutOpen,
  setCheckoutStep
}) {
  if (!isCartOpen) return null;
  return (
    <>
""" + cart_match.group(1) + """
    </>
  );
}
"""
    with open(r'c:\Users\Olamide\Documents\klasic\src\components\CartDrawer.jsx', 'w', encoding='utf-8') as f:
        f.write(cart_code)

# 6. Extract CheckoutModal
co_match = re.search(r'({\s*/\*\s*Checkout Modal\s*\*/\s*}[\s\S]*?)(?=\s*<Footer)', content)
if co_match:
    co_code = """import { motion } from 'framer-motion';

export function CheckoutModal({
  isCheckoutOpen,
  setIsCheckoutOpen,
  checkoutStep,
  setCheckoutStep,
  customerForm,
  setCustomerForm,
  handleCheckoutSubmit,
  formatPrice,
  cartSubtotal,
  cart,
  setCart
}) {
  if (!isCheckoutOpen) return null;
  return (
    <>
""" + co_match.group(1) + """
    </>
  );
}
"""
    with open(r'c:\Users\Olamide\Documents\klasic\src\components\CheckoutModal.jsx', 'w', encoding='utf-8') as f:
        f.write(co_code)

# 7. Update App.jsx
new_app_content = content
if match_products:
    new_app_content = new_app_content.replace(match_products.group(1), '')
if match_reviews:
    new_app_content = new_app_content.replace(match_reviews.group(1), '')

imports_to_add = """import { PRODUCTS } from './data/catalog';
import { ShopTheLook } from './components/ShopTheLook';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
"""

new_app_content = new_app_content.replace("import './index.css';", "import './index.css';\n" + imports_to_add)

if shop_match:
    new_app_content = new_app_content.replace(shop_match.group(1), '<ShopTheLook />')

if qv_match:
    qv_comp = """
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
      />"""
    new_app_content = new_app_content.replace(qv_match.group(1), qv_comp)

if sg_match:
    sg_comp = """
      <SizeGuideModal
        isSizeGuideOpen={isSizeGuideOpen}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />"""
    new_app_content = new_app_content.replace(sg_match.group(1), sg_comp)

if cart_match:
    cart_comp = """
      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        cartSubtotal={cartSubtotal}
        formatPrice={formatPrice}
        setIsCheckoutOpen={setIsCheckoutOpen}
        setCheckoutStep={setCheckoutStep}
      />"""
    # handle duplicate comment issue for cart drawer, it had {* Cart Drawer *} twice.
    new_app_content = new_app_content.replace(cart_match.group(1), cart_comp)

if co_match:
    co_comp = """
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
      />"""
    new_app_content = new_app_content.replace(co_match.group(1), co_comp)

# Clean up duplicate {* Cart Drawer *} if it exists
new_app_content = new_app_content.replace("{/* Cart Drawer */}\n      {/* Cart Drawer */}", "")

with open(app_file, 'w', encoding='utf-8') as f:
    f.write(new_app_content)

print("Extraction complete.")
