import "./Hero.css";

interface HeroProps {
  onExploreTienda?: () => void;
}

export default function Hero({ onExploreTienda }: HeroProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onExploreTienda) {
      e.preventDefault();
      onExploreTienda();
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-content">
          <h1 id="hero-title">
            Tu próxima ruta
            <br />
            empieza aquí
          </h1>

          <p>Equipate para disfrutar cada kilómetro.</p>

          <a
            className="primary-button"
            href="#tienda"
            onClick={handleClick}
          >
            Explorar tienda
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}