import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  cartCount?: number;
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  onSearch?: (query: string) => void;
  onOpenCart?: () => void;
}

export default function Header({
  cartCount = 0,
  activePage = "inicio",
  onNavigate,
  onSearch,
  onOpenCart,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio", label: "Inicio", href: "#inicio" },
    { id: "tienda", label: "Tienda", href: "#tienda" },
    { id: "categorias", label: "Categorías", href: "#categorias" },
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Left Side: Brand and Navigation */}
        <div className="header-left">
          <a
            className="brand"
            href="#inicio"
            aria-label="RideLab, volver al inicio"
            onClick={(e) => handleNavClick(e, "inicio")}
          >
            <span className="brand-ride">Ride</span>
            <span className="brand-lab">Lab</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activePage === item.id ? "active" : ""}`}
                aria-current={activePage === item.id ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side: Search, Cart & Mobile Menu Button */}
        <div className="header-actions">
          {/* Search Button & Popover */}
          <div className="search-box-container">
            <button
              type="button"
              className={`header-icon-btn ${isSearchOpen ? "active" : ""}`}
              aria-label="Buscar productos"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {isSearchOpen && (
              <form
                className="search-dropdown"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    if (onSearch) {
                      onSearch(searchQuery.trim());
                    } else if (onNavigate) {
                      onNavigate("tienda");
                    }
                    setIsSearchOpen(false);
                  }
                }}
              >
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar cascos, guantes, accesorios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  aria-label="Término de búsqueda"
                />
                <button type="submit" className="search-submit">
                  Buscar
                </button>
              </form>
            )}
          </div>

          {/* Shopping Cart Button */}
          <button
            type="button"
            className="header-icon-btn cart-btn"
            aria-label={`Carrito de compras con ${cartCount} productos`}
            onClick={onOpenCart}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-nav-link ${activePage === item.id ? "active" : ""}`}
                onClick={(e) => {
                  handleNavClick(e, item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}