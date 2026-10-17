import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Colectivo Siete50",
  shortName: "Siete50",
  tagline: "Narrativa, marca y experiencia.",
  description:
    "Estudio colectivo para marcas que necesitan cine, estrategia y producto digital en un mismo equipo.",
  locale: "es-MX",
  email: "hola@colectivosiete50.com",
  whatsappDisplay: "+52 00 0000 0000",
  city: "México",
  nav: [
    { href: "#about", label: "Estudio" },
    { href: "#divisions", label: "Divisiones" },
    { href: "#cases", label: "Casos" },
    { href: "#contact", label: "Contacto" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
  ],
  divisions: [
    {
      id: "produccion",
      title: "Producción",
      summary: "Piezas cinematográficas, spots y contenido de alto impacto visual.",
      bullets: ["Dirección y realización", "Postproducción", "Motion y sound design"],
      icon: "clapperboard",
    },
    {
      id: "marca",
      title: "Marca",
      summary: "Sistemas de identidad, tono de voz y plataformas de comunicación.",
      bullets: ["Identidad visual", "Narrativa de marca", "Campañas"],
      icon: "sparkles",
    },
    {
      id: "experiencias",
      title: "Experiencias",
      summary: "Activaciones, eventos y entornos que se sienten como una película.",
      bullets: ["Concepto espacial", "Dirección de arte", "Live content"],
      icon: "compass",
    },
    {
      id: "digital",
      title: "Digital",
      summary: "Productos, sitios y sistemas listos para escalar con la marca.",
      bullets: ["Web de alto rendimiento", "Producto digital", "Contenido interactivo"],
      icon: "monitor",
    },
  ],
  cases: [
    {
      id: "aurora",
      title: "Aurora Launch",
      client: "Aurora",
      division: "Producción",
      year: "2025",
      description: "Película de lanzamiento y sistema de contenidos para una marca de lifestyle.",
      imageSrc:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Set de producción cinematográfica con iluminación cálida",
    },
    {
      id: "norte",
      title: "Norte Fest",
      client: "Norte",
      division: "Experiencias",
      year: "2025",
      description: "Identidad viva y cobertura inmersiva para un festival independiente.",
      imageSrc:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Escenario de festival con público y luces",
    },
    {
      id: "linea",
      title: "Línea Platform",
      client: "Línea",
      division: "Digital",
      year: "2024",
      description: "Plataforma digital y lenguaje visual para un producto de suscripción.",
      imageSrc:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Interfaz digital sobre un escritorio de diseño",
    },
  ],
};
