import "./CategoriasGuide.css";

interface CategoriasGuideProps {
  onSelectCategory: (categoryName: string) => void;
  onNavigateHome: () => void;
  onExploreAll: () => void;
}

interface ProductPreview {
  name: string;
  priceFormatted: string;
  image: string;
}

interface GuideSection {
  id: string;
  categoryFilter: string;
  number: string;
  title: string;
  description: string;
  points: string[];
  techTags: string[];
  proTip: string;
  sampleProducts: ProductPreview[];
  image: string;
  imagePosition: "left" | "right";
  isDarkTheme?: boolean;
}

const guideSections: GuideSection[] = [
  {
    id: "cascos",
    categoryFilter: "Cascos",
    number: "01",
    title: "Cascos",
    description:
      "El casco forma parte esencial del equipo de protección. El ajuste y la comodidad son claves al elegirlo.",
    points: [
      "Ajuste firme, sin puntos de presión",
      "Visibilidad y ventilación",
      "Certificación verificable para tu mercado",
    ],
    techTags: ["ECE 22.06 / DOT", "Pinlock Ready", "EPS Multidensidad", "Cierre Doble D / Micrométrico"],
    proTip:
      "Al probártelo, abrochalo y sacudí la cabeza hacia los lados. Las almohadillas deben acompañar el movimiento de tus mejillas sin resbalar.",
    sampleProducts: [
      {
        name: "Casco integral negro",
        priceFormatted: "$129.00 USD",
        image: "/images/prod-casco.jpg",
      },
      {
        name: "Casco adventure",
        priceFormatted: "$149.00 USD",
        image: "/images/prod-casco-adventure.jpg",
      },
    ],
    image: "/images/guide-cascos.jpg",
    imagePosition: "left",
  },
  {
    id: "guantes",
    categoryFilter: "Guantes",
    number: "02",
    title: "Guantes",
    description:
      "Ayudan a mantener el agarre y protegen las manos durante la conducción.",
    points: [
      "Talla y libertad de movimiento",
      "Protección y refuerzos",
      "Material adecuado al clima",
    ],
    techTags: ["Cuero Genuino", "Protección Nudillos TPU", "Dedo Táctil (Touchscreen)", "Palma Antideslizante"],
    proTip:
      "Cerrá el puño como si sujetaras el manillar: las costuras de las puntas de los dedos no deben quedar excesivamente tirantes ni doblarse.",
    sampleProducts: [
      {
        name: "Guantes de ruta",
        priceFormatted: "$39.00 USD",
        image: "/images/prod-guantes.jpg",
      },
      {
        name: "Guantes urbanos",
        priceFormatted: "$29.00 USD",
        image: "/images/prod-guantes-urbanos.jpg",
      },
    ],
    image: "/images/guide-guantes.jpg",
    imagePosition: "right",
  },
  {
    id: "intercomunicadores",
    categoryFilter: "Intercomunicadores",
    number: "03",
    title: "Intercomunicadores",
    description:
      "Permiten escuchar indicaciones o comunicarse durante la ruta. Las funciones dependen de cada modelo.",
    points: [
      "Compatibilidad con tu casco",
      "Controles fáciles de usar",
      "Conexión entre dispositivos",
    ],
    techTags: ["Bluetooth 5.2 / Mesh", "Cancelación de Ruido DSP", "Audio HD 40mm", "Resistente a Lluvia"],
    proTip:
      "Comprobá que el interior de tu casco cuente con las cavidades redondas para parlantes; así no tendrás molestias tras una hora continua en ruta.",
    sampleProducts: [
      {
        name: "Intercomunicador",
        priceFormatted: "$89.00 USD",
        image: "/images/prod-intercom.jpg",
      },
    ],
    image: "/images/guide-intercom.jpg",
    imagePosition: "left",
    isDarkTheme: true,
  },
  {
    id: "chaquetas",
    categoryFilter: "Chaquetas",
    number: "04",
    title: "Chaquetas",
    description:
      "Combinan comodidad y protección para distintos recorridos y condiciones.",
    points: [
      "Ajuste en posición de conducción",
      "Protecciones y materiales",
      "Ventilación según el clima",
    ],
    techTags: ["Cordura 600D Antiarrugas", "Protecciones CE Nivel 2", "Membrana Transpirable", "Zonas Reflectivas 3M"],
    proTip:
      "En postura de conducción (brazos estirados al frente), las mangas deben cubrir hasta la muñeca y el largo de la espalda proteger la zona lumbar.",
    sampleProducts: [
      {
        name: "Chaqueta touring",
        priceFormatted: "$159.00 USD",
        image: "/images/prod-chaqueta.jpg",
      },
      {
        name: "Chaqueta urbana",
        priceFormatted: "$119.00 USD",
        image: "/images/prod-chaqueta-urbana.jpg",
      },
    ],
    image: "/images/guide-chaquetas.jpg",
    imagePosition: "right",
  },
  {
    id: "accesorios",
    categoryFilter: "Accesorios",
    number: "05",
    title: "Accesorios",
    description:
      "Los detalles prácticos ayudan a organizar y preparar cada salida.",
    points: [
      "Compatibilidad con tu moto",
      "Montaje firme y adecuado",
      "Utilidad para tus recorridos",
    ],
    techTags: ["Anti-Vibración CNC", "Material Impermeable IP67", "Fijación Rápida", "Uso Universal"],
    proTip:
      "Revisá siempre los aprietes y correas antes de arrancar y tras los primeros 30 km. Las vibraciones del motor y el asfalto tienden a asentar los anclajes.",
    sampleProducts: [
      {
        name: "Bolso de asiento",
        priceFormatted: "$59.00 USD",
        image: "/images/prod-bolso-asiento.jpg",
      },
      {
        name: "Soporte para celular",
        priceFormatted: "$25.00 USD",
        image: "/images/prod-soporte-celular.jpg",
      },
    ],
    image: "/images/guide-accesorios.jpg",
    imagePosition: "left",
  },
];

export default function CategoriasGuide({
  onSelectCategory,
  onNavigateHome,
  onExploreAll,
}: CategoriasGuideProps) {
  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="guide-page">
      <div className="container">
        {/* Breadcrumb matching reference */}
        <nav className="guide-breadcrumb" aria-label="Ruta de navegación">
          <button
            type="button"
            className="breadcrumb-link"
            onClick={onNavigateHome}
          >
            Inicio
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Categorías</span>
        </nav>

        {/* Page Header */}
        <header className="guide-header">
          <span className="section-badge">GUÍA DE EQUIPAMIENTO</span>
          <h1 className="guide-main-title">
            Conocé tu equipo. Disfrutá la ruta.
          </h1>
          <p className="guide-subtitle">
            Una guía para entender qué aporta cada accesorio y qué considerar antes de elegir.
          </p>

          {/* Quick Anchor Jump Links */}
          <div className="guide-quick-links" aria-label="Acceso rápido por categoría">
            {guideSections.map((sec, idx) => (
              <span key={sec.id} className="quick-link-wrapper">
                <button
                  type="button"
                  className="quick-link-btn"
                  onClick={() => scrollToCategory(sec.id)}
                >
                  {sec.title}
                </button>
                {idx < guideSections.length - 1 && (
                  <span className="quick-link-dot" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </header>

        {/* 5 Alternating Guide Sections */}
        <div className="guide-sections-list">
          {guideSections.map((sec) => (
            <article
              key={sec.id}
              id={sec.id}
              className={`guide-card ${sec.isDarkTheme ? "theme-dark" : "theme-light"} layout-${sec.imagePosition}`}
            >
              <div className="guide-image-box">
                <img
                  src={sec.image}
                  alt={`Equipo RideLab: ${sec.title}`}
                  className="guide-img"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="guide-image-overlay-btn"
                  onClick={() => onSelectCategory(sec.categoryFilter)}
                  aria-label={`Ver catálogo de ${sec.title}`}
                >
                  <span>Explorar {sec.title}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className="guide-content-box">
                <div className="guide-number-tag">
                  <span className="number-digits">{sec.number}</span>
                  <span className="number-line" aria-hidden="true"></span>
                </div>

                <h2 className="guide-section-title">{sec.title}</h2>
                <p className="guide-section-desc">{sec.description}</p>

                {/* Considerations List */}
                <div className="guide-considerations">
                  <span className="considerations-tag">QUÉ TENER EN CUENTA</span>
                  <ul className="considerations-list">
                    {sec.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* Tech specifications chips */}
                <div className="guide-tech-tags" aria-label="Especificaciones destacadas">
                  {sec.techTags.map((tag, i) => (
                    <span key={i} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* RideLab Pro Tip */}
                <div className="guide-protip-box">
                  <span className="protip-label">Consejo RideLab:</span>
                  <p className="protip-text">{sec.proTip}</p>
                </div>

                {/* Live Products preview pills */}
                {sec.sampleProducts.length > 0 && (
                  <div className="guide-products-preview">
                    <span className="preview-label">Disponibles en tienda:</span>
                    <div className="preview-pills">
                      {sec.sampleProducts.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="product-pill-btn"
                          onClick={() => onSelectCategory(sec.categoryFilter)}
                          title={`Ver ${p.name} en la tienda`}
                        >
                          <img
                            src={p.image}
                            alt=""
                            className="pill-thumb"
                            aria-hidden="true"
                          />
                          <span className="pill-name">{p.name}</span>
                          <span className="pill-price">{p.priceFormatted}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct CTA button to Catalog */}
                <div className="guide-actions-row">
                  <button
                    type="button"
                    className="guide-catalog-cta-btn"
                    onClick={() => onSelectCategory(sec.categoryFilter)}
                  >
                    <span>Ver catálogo de {sec.title}</span>
                    <span className="cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Disclaimer Box */}
        <aside className="guide-disclaimer-box">
          <span className="disclaimer-icon" aria-hidden="true">
            ⓘ
          </span>
          <p className="disclaimer-text">
            Esta guía es orientativa. Revisá siempre la información del fabricante y la normativa aplicable.
          </p>
        </aside>

        {/* Bottom CTA Banner */}
        <section className="guide-bottom-banner" aria-label="Llamado a la acción">
          <h2 className="banner-question">¿Ya sabés qué necesitás?</h2>
          <button
            type="button"
            className="banner-explore-btn"
            onClick={onExploreAll}
          >
            <span>Explorar tienda</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
        </section>
      </div>
    </div>
  );
}
