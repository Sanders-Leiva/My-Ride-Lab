import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import SpiritBanner from "./components/SpiritBanner";
import Tienda from "./components/Tienda";
import CategoriasGuide from "./components/CategoriasGuide";
import Footer from "./components/Footer";
import CartDrawer, { type CartItem } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { type Product } from "./data/products";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState<string>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("tienda")) return "tienda";
    if (hash.includes("categorias")) return "categorias";
    return "inicio";
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Total items quantity
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("tienda")) {
        setActivePage("tienda");
      } else if (hash.includes("categorias")) {
        setActivePage("categorias");
      } else if (hash.includes("inicio") || hash === "" || hash === "#") {
        setActivePage("inicio");
      }
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigate = (pageId: string) => {
    if (pageId === "tienda") {
      setSelectedCategory("Todas");
      setActivePage("tienda");
      window.location.hash = "#tienda";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pageId === "inicio") {
      setActivePage("inicio");
      window.location.hash = "#inicio";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pageId === "categorias") {
      setActivePage("categorias");
      window.location.hash = "#categorias";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pageId === "contacto") {
      if (activePage !== "inicio") {
        setActivePage("inicio");
        window.location.hash = "#contacto";
        setTimeout(() => {
          document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActivePage("tienda");
    window.location.hash = `#tienda?cat=${encodeURIComponent(categoryName)}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add to cart with quantity tracking
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage(`✓ ${product.name} agregado al carrito`);
    setTimeout(() => {
      setToastMessage((current) => (current?.includes(product.name) ? null : current));
    }, 2600);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove single product
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Begin Checkout action
  const handleBeginCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Purchase Complete action
  const handleCompletePurchase = (orderId: string) => {
    setCartItems([]);
    setToastMessage(`Pedido #${orderId} registrado con éxito`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      {/* Header with real-time cart count and drawer trigger */}
      <Header
        cartCount={totalCartCount}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={(query) => {
          setActivePage("tienda");
          window.location.hash = `#tienda?q=${encodeURIComponent(query)}`;
        }}
      />

      <main id="main-content" tabIndex={-1}>
        {activePage === "tienda" ? (
          /* Tienda Section View */
          <Tienda
            key={selectedCategory}
            initialCategory={selectedCategory}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => handleNavigate("inicio")}
          />
        ) : activePage === "categorias" ? (
          /* Guía de Equipamiento / Categorías View */
          <CategoriasGuide
            onSelectCategory={handleSelectCategoryFromHome}
            onNavigateHome={() => handleNavigate("inicio")}
            onExploreAll={() => handleNavigate("tienda")}
          />
        ) : (
          /* Home Page Sections */
          <>
            <Hero onExploreTienda={() => handleNavigate("tienda")} />
            <Categories
              onSelectCategory={handleSelectCategoryFromHome}
              onViewGuide={() => handleNavigate("categorias")}
            />
            <FeaturedProducts
              onAddToCart={handleAddToCart}
              onSelectProduct={handleAddToCart}
              onNavigateTienda={() => handleNavigate("tienda")}
            />
            <SpiritBanner onExploreTienda={() => handleNavigate("tienda")} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onBeginCheckout={handleBeginCheckout}
      />

      {/* Checkout & Purchase Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onCompletePurchase={handleCompletePurchase}
      />

      {/* Cart Toast Notification */}
      {toastMessage && (
        <aside className="toast-notification" role="status" aria-live="polite">
          <div className="toast-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="toast-text">{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}