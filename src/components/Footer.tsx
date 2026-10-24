import "./Footer.css";

interface FooterProps {
  onNavigate?: (pageId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <a
            href="#inicio"
            className="footer-brand"
            aria-label="RideLab inicio"
            onClick={(e) => handleNav(e, "inicio")}
          >
            <span className="brand-ride">Ride</span>
            <span className="brand-lab">Lab</span>
          </a>
          <p className="footer-tagline">Equipo para disfrutar el camino.</p>
        </div>

        {/* Navigation Column */}
        <div className="footer-col border-col">
          <h4 className="footer-col-title">Navegación</h4>
          <ul className="footer-links">
            <li><a href="#inicio" onClick={(e) => handleNav(e, "inicio")}>Inicio</a></li>
            <li><a href="#tienda" onClick={(e) => handleNav(e, "tienda")}>Tienda</a></li>
            <li><a href="#categorias" onClick={(e) => handleNav(e, "categorias")}>Categorías</a></li>
            <li><a href="#contacto" onClick={(e) => handleNav(e, "contacto")}>Contacto</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col border-col" id="contacto">
          <h4 className="footer-col-title">Contacto</h4>
          <p className="footer-contact-text">Consultas sobre el proyecto.</p>
        </div>

        {/* Social Icons Column */}
        <div className="footer-col social-col">
          <div className="social-links" aria-label="Redes sociales">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label="YouTube"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              aria-label="Facebook"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="container footer-bottom">
        <p className="copyright">RideLab · Proyecto de demostración</p>
      </div>
    </footer>
  );
}
