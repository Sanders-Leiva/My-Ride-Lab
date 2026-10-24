import "./Categories.css";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
  layout: "large" | "medium" | "tall";
}

const categories: CategoryItem[] = [
  {
    id: "cascos",
    name: "Cascos",
    image: "/images/cat-cascos.jpg",
    href: "#tienda?cat=cascos",
    layout: "large",
  },
  {
    id: "guantes",
    name: "Guantes",
    image: "/images/cat-guantes.jpg",
    href: "#tienda?cat=guantes",
    layout: "medium",
  },
  {
    id: "intercomunicadores",
    name: "Intercomunicadores",
    image: "/images/cat-intercom.jpg",
    href: "#tienda?cat=intercomunicadores",
    layout: "medium",
  },
  {
    id: "chaquetas",
    name: "Chaquetas",
    image: "/images/cat-chaquetas.jpg",
    href: "#tienda?cat=chaquetas",
    layout: "tall",
  },
];

interface CategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
  onViewGuide?: () => void;
}

export default function Categories({
  onSelectCategory,
  onViewGuide,
}: CategoriesProps) {
  const handleClick = (e: React.MouseEvent, catName: string) => {
    if (onSelectCategory) {
      e.preventDefault();
      onSelectCategory(catName);
    }
  };

  return (
    <section className="categories-section" id="categorias" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">CATEGORÍAS</span>
          <h2 id="categories-heading" className="section-title">
            Equipo para cada ruta
          </h2>
        </div>

        <div className="categories-grid">
          {/* Left: Large Cascos card */}
          <a
            href={categories[0].href}
            className="category-card card-large"
            aria-label="Ver categoría Cascos"
            onClick={(e) => handleClick(e, categories[0].name)}
          >
            <div className="card-image-wrapper">
              <img
                src={categories[0].image}
                alt="Casco de moto integral sobre roca en montaña"
                className="category-img"
                loading="lazy"
              />
            </div>
            <div className="category-meta">
              <span className="category-title">{categories[0].name}</span>
              <span className="category-arrow" aria-hidden="true">→</span>
            </div>
          </a>

          {/* Middle: Stacked Guantes & Intercomunicadores */}
          <div className="categories-stack">
            <a
              href={categories[1].href}
              className="category-card card-stacked"
              aria-label="Ver categoría Guantes"
              onClick={(e) => handleClick(e, categories[1].name)}
            >
              <div className="card-image-wrapper">
                <img
                  src={categories[1].image}
                  alt="Guantes de cuero de motociclista"
                  className="category-img"
                  loading="lazy"
                />
              </div>
              <div className="category-meta">
                <span className="category-title">{categories[1].name}</span>
                <span className="category-arrow" aria-hidden="true">→</span>
              </div>
            </a>

            <a
              href={categories[2].href}
              className="category-card card-stacked"
              aria-label="Ver categoría Intercomunicadores"
              onClick={(e) => handleClick(e, categories[2].name)}
            >
              <div className="card-image-wrapper">
                <img
                  src={categories[2].image}
                  alt="Intercomunicador bluetooth para casco"
                  className="category-img"
                  loading="lazy"
                />
              </div>
              <div className="category-meta">
                <span className="category-title">{categories[2].name}</span>
                <span className="category-arrow" aria-hidden="true">→</span>
              </div>
            </a>
          </div>

          {/* Right: Tall Chaquetas card */}
          <a
            href={categories[3].href}
            className="category-card card-tall"
            aria-label="Ver categoría Chaquetas"
            onClick={(e) => handleClick(e, categories[3].name)}
          >
            <div className="card-image-wrapper">
              <img
                src={categories[3].image}
                alt="Chaqueta touring de moto con protecciones"
                className="category-img"
                loading="lazy"
              />
            </div>
            <div className="category-meta">
              <span className="category-title">{categories[3].name}</span>
              <span className="category-arrow" aria-hidden="true">→</span>
            </div>
          </a>
        </div>

        {/* Callout banner to Guía de Equipamiento */}
        {onViewGuide && (
          <div className="categories-guide-callout">
            <div className="guide-callout-info">
              <span className="guide-callout-badge">GUÍA RIDER</span>
              <h3 className="guide-callout-title">¿Dudas con la talla o la certificación?</h3>
              <p className="guide-callout-desc">
                Revisá nuestra guía de equipamiento con recomendaciones técnicas para cascos, guantes, chaquetas e intercomunicadores.
              </p>
            </div>
            <button
              type="button"
              className="guide-callout-btn"
              onClick={onViewGuide}
            >
              <span>Ver guía de equipamiento</span>
              <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
