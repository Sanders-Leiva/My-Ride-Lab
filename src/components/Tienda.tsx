import { useState, useMemo } from "react";
import { allProducts, type Product } from "../data/products";
import "./Tienda.css";

interface TiendaProps {
  initialCategory?: string;
  onAddToCart: (product: Product) => void;
  onNavigateHome: () => void;
}

const CATEGORIES_LIST = [
  "Todas",
  "Cascos",
  "Guantes",
  "Intercomunicadores",
  "Chaquetas",
  "Accesorios",
] as const;

export default function Tienda({
  initialCategory,
  onAddToCart,
  onNavigateHome,
}: TiendaProps) {
  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && initialCategory !== "Todas"
      ? [initialCategory]
      : ["Todas"]
  );

  const [minPriceInput, setMinPriceInput] = useState<string>("0");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("200");
  const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 200,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("destacados");
  const [addedId, setAddedId] = useState<string | null>(null);

  // Handle category checkbox click
  const handleCategoryToggle = (category: string) => {
    if (category === "Todas") {
      setSelectedCategories(["Todas"]);
      return;
    }

    let updated = selectedCategories.filter((c) => c !== "Todas");
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
      if (updated.length === 0) {
        updated = ["Todas"];
      }
    } else {
      updated.push(category);
    }
    setSelectedCategories(updated);
  };

  // Handle Apply Price Filters
  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = parseFloat(minPriceInput.replace(/[^0-9.]/g, "")) || 0;
    const max = parseFloat(maxPriceInput.replace(/[^0-9.]/g, "")) || 9999;
    setAppliedPriceRange({ min, max });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories(["Todas"]);
    setMinPriceInput("0");
    setMaxPriceInput("200");
    setAppliedPriceRange({ min: 0, max: 200 });
    setSearchQuery("");
    setSortBy("destacados");
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (!selectedCategories.includes("Todas")) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= appliedPriceRange.min && p.price <= appliedPriceRange.max
    );

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case "precio-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nombre":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "destacados":
      default:
        // Default order or featured first
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategories, appliedPriceRange, searchQuery, sortBy]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="tienda-page">
      <div className="container">
        {/* Breadcrumb navigation */}
        <nav className="tienda-breadcrumb" aria-label="Ruta de navegación">
          <button
            type="button"
            className="breadcrumb-link"
            onClick={onNavigateHome}
          >
            Inicio
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Tienda</span>
        </nav>

        {/* Page Header */}
        <header className="tienda-header">
          <span className="section-badge">EQUIPO PARA TU PRÓXIMA RUTA</span>
          <h1 className="tienda-title">Tienda RideLab</h1>
          <p className="tienda-subtitle">
            Encontrá tu equipo y preparate para salir.
          </p>
        </header>

        {/* Main Content: Sidebar + Products Grid */}
        <div className="tienda-layout">
          {/* Left: Filters Sidebar */}
          <aside className="tienda-sidebar" aria-label="Filtros de productos">
            <div className="filters-header">
              <h2 className="filters-title">Filtros</h2>
              <button
                type="button"
                className="clear-filters-btn"
                onClick={handleResetFilters}
              >
                Limpiar filtros
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Categorías</h3>
              <ul className="category-checkbox-list">
                {CATEGORIES_LIST.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <li key={cat}>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="custom-checkbox-input"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat)}
                        />
                        <span className={`custom-checkbox ${isChecked ? "checked" : ""}`}>
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </span>
                        <span className="checkbox-text">{cat}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Precio</h3>
              <form onSubmit={handleApplyPrice} className="price-filter-form">
                <div className="price-field">
                  <label htmlFor="price-min" className="price-label">
                    Desde
                  </label>
                  <div className="price-input-wrapper">
                    <span className="currency-prefix">$</span>
                    <input
                      id="price-min"
                      type="number"
                      className="price-input"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      min="0"
                      step="5"
                    />
                  </div>
                </div>

                <div className="price-field">
                  <label htmlFor="price-max" className="price-label">
                    Hasta
                  </label>
                  <div className="price-input-wrapper">
                    <span className="currency-prefix">$</span>
                    <input
                      id="price-max"
                      type="number"
                      className="price-input"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      min="0"
                      step="5"
                    />
                  </div>
                </div>

                <button type="submit" className="apply-filters-btn">
                  Aplicar filtros
                </button>
              </form>
            </div>
          </aside>

          {/* Right: Products Area */}
          <main className="tienda-main">
            {/* Top Toolbar (Search, Sort, Product Count) */}
            <div className="tienda-toolbar">
              <div className="search-bar-wrapper">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
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
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="toolbar-search-input"
                  aria-label="Buscar producto por nombre"
                />
              </div>

              <div className="sort-wrapper">
                <label htmlFor="sort-select" className="sort-label">
                  Ordenar por
                </label>
                <div className="select-container">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="destacados">Destacados</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre">Nombre: A - Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Count */}
            <div className="products-count-bar">
              <span>{filteredProducts.length} productos</span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <p>No se encontraron productos con los filtros seleccionados.</p>
                <button
                  type="button"
                  className="reset-search-btn"
                  onClick={handleResetFilters}
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="tienda-grid">
                {filteredProducts.map((product) => {
                  const isAdded = addedId === product.id;
                  return (
                    <article key={product.id} className="tienda-product-card">
                      <div className="tienda-img-box">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="tienda-product-img"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          className={`tienda-quick-add ${isAdded ? "added" : ""}`}
                          onClick={(e) => handleAdd(e, product)}
                          aria-label={`Agregar ${product.name} al carrito`}
                        >
                          {isAdded ? "✓ Agregado" : "+ Carrito"}
                        </button>
                      </div>

                      <div className="tienda-product-info">
                        <span className="product-category-tag">
                          {product.category}
                        </span>
                        <h3 className="tienda-product-title">{product.name}</h3>
                        <p className="tienda-product-price">
                          {product.priceFormatted}
                        </p>
                        <button
                          type="button"
                          className="tienda-action-link"
                          onClick={(e) => handleAdd(e, product)}
                        >
                          <span>Ver producto</span>
                          <span className="arrow" aria-hidden="true">→</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
