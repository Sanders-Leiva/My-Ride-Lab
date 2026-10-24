import { useState } from "react";
import { allProducts, type Product } from "../data/products";
import "./FeaturedProducts.css";

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  onNavigateTienda?: () => void;
}

const featuredProducts = allProducts.filter((p) => p.isFeatured);

export default function FeaturedProducts({
  onAddToCart,
  onSelectProduct,
  onNavigateTienda,
}: FeaturedProductsProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <section className="featured-section" id="tienda" aria-labelledby="featured-heading">
      <div className="container">
        {/* Section Top Header */}
        <div className="featured-header">
          <div className="featured-header-left">
            <span className="section-badge">PRODUCTOS</span>
            <h2 id="featured-heading" className="section-title">
              Destacados de RideLab
            </h2>
          </div>

          <button
            type="button"
            className="view-all-link"
            onClick={onNavigateTienda}
          >
            <span>Ver toda la tienda</span>
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {featuredProducts.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <article key={product.id} className="product-card">
                <div
                  className="product-image-container"
                  onClick={() => onSelectProduct?.(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className={`quick-add-btn ${isAdded ? "added" : ""}`}
                    onClick={(e) => handleAdd(e, product)}
                    aria-label={`Agregar ${product.name} al carrito`}
                  >
                    {isAdded ? "✓ Agregado" : "+ Carrito"}
                  </button>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.priceFormatted}</p>
                  <button
                    type="button"
                    className="product-action-link"
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(product);
                      } else if (onAddToCart) {
                        onAddToCart(product);
                      }
                    }}
                  >
                    <span>Ver producto</span>
                    <span className="product-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
