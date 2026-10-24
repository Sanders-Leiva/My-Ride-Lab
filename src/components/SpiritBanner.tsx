import "./SpiritBanner.css";

interface SpiritBannerProps {
  onExploreTienda?: () => void;
}

export default function SpiritBanner({ onExploreTienda }: SpiritBannerProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onExploreTienda) {
      e.preventDefault();
      onExploreTienda();
    }
  };

  return (
    <section className="spirit-section" aria-labelledby="spirit-heading">
      <div className="container">
        <div className="spirit-grid">
          {/* Left: Road photo with motorcyclist */}
          <div className="spirit-image-wrapper">
            <img
              src="/images/banner-viaje.jpg"
              alt="Motociclista con equipaje recorriendo ruta de montaña"
              className="spirit-img"
              loading="lazy"
            />
          </div>

          {/* Right: Copy & Action */}
          <div className="spirit-content">
            <span className="section-badge red-text">EL ESPÍRITU RIDELAB</span>
            <h2 id="spirit-heading" className="spirit-title">
              Más que accesorios.
              <br />
              Parte de tu viaje.
            </h2>
            <p className="spirit-description">
              La ciudad, la carretera y lo que viene después. Encontrá equipo que
              acompañe tu forma de rodar.
            </p>
            <a
              href="#tienda"
              className="spirit-link"
              onClick={handleClick}
            >
              <span>Explorar tienda</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
