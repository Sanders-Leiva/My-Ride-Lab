import { type Product } from "../data/products";
import "./CartDrawer.css";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onBeginCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBeginCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <h2 className="cart-drawer-title">Tu Carrito</h2>
            <span className="cart-items-count">({totalQuantity})</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="empty-cart-text">Tu carrito está vacío</p>
              <p className="empty-cart-subtext">Agregá tu equipo favorito para empezar tu ruta.</p>
              <button
                type="button"
                className="cart-explore-btn"
                onClick={onClose}
              >
                Explorar tienda
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item-card">
                  <div className="cart-item-img-box">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-item-img"
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-cat">{product.category}</span>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Eliminar ${product.name} del carrito`}
                      >
                        ✕
                      </button>
                    </div>

                    <h3 className="cart-item-name">{product.name}</h3>
                    <p className="cart-item-price-single">
                      ${product.price.toFixed(2)} USD c/u
                    </p>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label="Disminuir cantidad"
                        >
                          −
                        </button>
                        <span className="qty-value">{quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <span className="cart-item-total">
                        ${(product.price * quantity).toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${totalAmount.toFixed(2)} USD</span>
            </div>
            <div className="cart-summary-row shipping-row">
              <span className="summary-label">Envío</span>
              <span className="summary-value free-badge">Gratis</span>
            </div>
            <div className="cart-summary-total">
              <span className="total-label">Total</span>
              <span className="total-value">${totalAmount.toFixed(2)} USD</span>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={onBeginCheckout}
            >
              <span>Continuar compra</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            <p className="cart-secure-notice">
              Envíos a todo el país · Garantía oficial RideLab
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
