import { useState } from "react";
import { type CartItem } from "./CartDrawer";
import "./CheckoutModal.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onCompletePurchase: (orderId: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onCompletePurchase,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State: starts clean and empty
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "card" as "card" | "store",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `RL-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrderId);
      setIsProcessing(false);
      setStep("success");

      onCompletePurchase(generatedOrderId);
    }, 1000);
  };

  const handleFinish = () => {
    setStep("checkout");
    onClose();
  };

  return (
    <div className="checkout-overlay" role="dialog" aria-modal="true">
      <div className="checkout-modal-container">
        {step === "checkout" ? (
          <>
            {/* Header */}
            <div className="checkout-modal-header">
              <div className="checkout-title-box">
                <span className="section-badge">RIDELAB CHECKOUT</span>
                <h2 className="checkout-title">Finalizar pedido</h2>
              </div>
              <button
                type="button"
                className="checkout-close-btn"
                onClick={onClose}
                aria-label="Cerrar ventana"
              >
                ✕
              </button>
            </div>

            {/* Form & Summary */}
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="checkout-grid">
                {/* Left: Contact, Delivery & Payment */}
                <div className="checkout-fields-col">
                  {/* Step 1: Delivery info */}
                  <h3 className="checkout-col-heading">1. Datos de entrega</h3>

                  <div className="checkout-input-group">
                    <label htmlFor="fullName" className="field-label">
                      Nombre y Apellido
                    </label>
                    <input
                      id="fullName"
                      required
                      type="text"
                      className="checkout-input"
                      placeholder="Ej. Carlos Jiménez"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="checkout-input-row">
                    <div className="checkout-input-group">
                      <label htmlFor="email" className="field-label">
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        className="checkout-input"
                        placeholder="tunombre@correo.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label htmlFor="phone" className="field-label">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        required
                        type="tel"
                        className="checkout-input"
                        placeholder="8888-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="checkout-input-row">
                    <div className="checkout-input-group flex-2">
                      <label htmlFor="address" className="field-label">
                        {formData.paymentMethod === "store"
                          ? "Dirección de referencia (opcional)"
                          : "Dirección de entrega"}
                      </label>
                      <input
                        id="address"
                        required={formData.paymentMethod !== "store"}
                        type="text"
                        className="checkout-input"
                        placeholder="Calle, avenida, número de casa..."
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label htmlFor="city" className="field-label">
                        Ciudad
                      </label>
                      <input
                        id="city"
                        required
                        type="text"
                        className="checkout-input"
                        placeholder="Ej. San José"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Step 2: Payment method */}
                  <h3 className="checkout-col-heading mt-4">2. Método de pago</h3>
                  <div className="payment-options">
                    {/* Option 1: Credit or Debit Card */}
                    <label
                      className={`payment-card ${
                        formData.paymentMethod === "card" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={() =>
                          setFormData({ ...formData, paymentMethod: "card" })
                        }
                      />
                      <span className="payment-label">
                        Tarjeta de crédito o débito
                      </span>
                    </label>

                    {/* Option 2: Pay at local store */}
                    <label
                      className={`payment-card ${
                        formData.paymentMethod === "store" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="store"
                        checked={formData.paymentMethod === "store"}
                        onChange={() =>
                          setFormData({ ...formData, paymentMethod: "store" })
                        }
                      />
                      <span className="payment-label">
                        Pago en el local / Retiro en tienda
                      </span>
                    </label>
                  </div>

                  {/* Conditional Payment Details */}
                  {formData.paymentMethod === "card" ? (
                    <div className="card-fields-box">
                      <div className="checkout-input-group">
                        <label htmlFor="cardNumber" className="field-label">
                          Número de tarjeta
                        </label>
                        <input
                          id="cardNumber"
                          required
                          type="text"
                          maxLength={19}
                          className="checkout-input"
                          placeholder="4000 1234 5678 9010"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardNumber: formatCardNumber(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="checkout-input-group">
                        <label htmlFor="cardName" className="field-label">
                          Nombre del titular
                        </label>
                        <input
                          id="cardName"
                          required
                          type="text"
                          className="checkout-input"
                          placeholder="Tal como figura en la tarjeta"
                          value={formData.cardName}
                          onChange={(e) =>
                            setFormData({ ...formData, cardName: e.target.value })
                          }
                        />
                      </div>

                      <div className="checkout-input-row">
                        <div className="checkout-input-group">
                          <label htmlFor="cardExpiry" className="field-label">
                            Vencimiento
                          </label>
                          <input
                            id="cardExpiry"
                            required
                            type="text"
                            maxLength={5}
                            className="checkout-input"
                            placeholder="MM/AA"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardExpiry: formatExpiry(e.target.value),
                              })
                            }
                          />
                        </div>

                        <div className="checkout-input-group">
                          <label htmlFor="cardCvv" className="field-label">
                            Código CVC
                          </label>
                          <input
                            id="cardCvv"
                            required
                            type="password"
                            maxLength={4}
                            className="checkout-input"
                            placeholder="123"
                            value={formData.cardCvv}
                            onChange={(e) =>
                              setFormData({ ...formData, cardCvv: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="store-pickup-box">
                      <div className="store-icon">📍</div>
                      <div className="store-text">
                        <strong>Retiro en RideLab Store & Workshop</strong>
                        <p>
                          Podés pagar en efectivo o con tarjeta al retirar tu
                          equipo. Guardamos tu orden por 48 horas en tienda.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Order Review */}
                <div className="checkout-summary-col">
                  <h3 className="checkout-col-heading">Resumen del pedido</h3>

                  <div className="checkout-items-preview">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="preview-item">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="preview-img"
                        />
                        <div className="preview-details">
                          <span className="preview-title">{product.name}</span>
                          <span className="preview-qty">Cant: {quantity}</span>
                        </div>
                        <span className="preview-price">
                          ${(product.price * quantity).toFixed(2)} USD
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-totals">
                    <div className="totals-line">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)} USD</span>
                    </div>
                    <div className="totals-line">
                      <span>
                        {formData.paymentMethod === "store"
                          ? "Retiro en local"
                          : "Envío a domicilio"}
                      </span>
                      <span className="text-green">Gratis</span>
                    </div>
                    <div className="totals-line total-highlight">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="purchase-submit-btn"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span>Procesando...</span>
                    ) : formData.paymentMethod === "card" ? (
                      <>
                        <span>Pagar ${totalAmount.toFixed(2)} USD</span>
                        <span className="arrow" aria-hidden="true">→</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar pedido para retiro</span>
                        <span className="arrow" aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className="security-tag">
                    {formData.paymentMethod === "card"
                      ? "Transacción cifrada y protegida · RideLab Secure"
                      : "Pago en el mostrador al retirar tu equipo"}
                  </p>
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Step B: Success confirmation screen */
          <div className="purchase-success-view">
            <div className="success-icon-badge">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <span className="section-badge red-text">ORDEN CONFIRMADA</span>
            <h2 className="success-title">¡Listo para rodar!</h2>
            <p className="order-number-badge">
              Nº de Orden: <strong>#{orderNumber}</strong>
            </p>

            <p className="success-description">
              {formData.paymentMethod === "store" ? (
                <>
                  Tu orden quedó reservada para retiro en nuestro taller a nombre de{" "}
                  <strong>{formData.fullName || "tu nombre"}</strong>. Te
                  esperamos en el mostrador para entregarte tu equipo y realizar
                  el pago.
                </>
              ) : (
                <>
                  Tu pago de <strong>${totalAmount.toFixed(2)} USD</strong> fue
                  procesado exitosamente. Recibirás el comprobante y el número de
                  guía en <strong>{formData.email}</strong> cuando el paquete
                  salga a reparto.
                </>
              )}
            </p>

            <div className="success-actions">
              <button
                type="button"
                className="success-btn"
                onClick={handleFinish}
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
