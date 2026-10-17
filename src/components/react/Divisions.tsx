import React, { useState } from "react";
import { motion } from "framer-motion";

interface SubItem {
  title: string;
  description: string;
}

interface SpecializationCard {
  number: string;
  title: string;
  bgImage: string;
  items: SubItem[];
}

const specializations: SpecializationCard[] = [
  {
    number: "01",
    title: "POLÍTICA Y GOBIERNO",
    bgImage: "/fondo1.jpeg",
    items: [
      {
        title: "CAMPAÑAS POLÍTICAS ESTRATÉGICAS",
        description:
          "Inteligencia, narrativa y movilización para ganar en las urnas.",
      },
      {
        title: "INFORMES DE GOBIERNO",
        description:
          "Rendición de cuentas y comunicación de alto impacto público.",
      },
      {
        title: "DESARROLLO DE PERFILES POLÍTICOS",
        description:
          "Posicionamiento, imagen pública y construcción de liderazgo.",
      },
      {
        title: "ESTRATEGIAS DIGITALES Y REDES SOMBRA",
        description: "Monitoreo, opinión pública y defensa narrativa en redes.",
      },
      {
        title: "EVENTOS MASIVOS Y RPPG",
        description: "Logística, producción y vinculación gubernamental.",
      },
    ],
  },
  {
    number: "02",
    title: "EMPRESARIAL Y MARCAS",
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        title: "BRANDING Y REDISEÑO DE IDENTIDAD",
        description:
          "Construcción de marcas de vanguardia y aceleración comercial.",
      },
      {
        title: "GESTIÓN AVANZADA DE REDES SOCIALES",
        description:
          "Creación de comunidad y contenido estratégico multicanal.",
      },
      {
        title: "CASA PRODUCTORA Y STREAMING",
        description:
          "Producción audiovisual cinematográfica y transmisiones en vivo.",
      },
      {
        title: "CREACIÓN Y DISTRIBUCIÓN DE CONTENIDO",
        description: "Estrategias phygital y conexión con audiencias clave.",
      },
      {
        title: "PROTECCIÓN DE MARCA Y VENTAS B2B",
        description: "Registro legal de activos e hipersegmentación comercial.",
      },
    ],
  },
];

export default function Divisions() {
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  return (
    <section
      id="divisions"
      className="relative w-full bg-black py-24 px-6 md:px-12 text-white overflow-hidden"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      {/* LÍNEAS DE LUZ LÁSER DE FONDO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 z-10">
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[2px] h-[650px] bg-gradient-to-b from-transparent via-[#e8b800] to-transparent blur-[2px] rotate-12"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-1/3 w-[2px] h-[650px] bg-gradient-to-b from-transparent via-[#ffe680] to-transparent blur-[2px] -rotate-12"
        />
      </div>

      {/* CONTENIDO PRINCIPAL DE LA SECCIÓN */}
      <div className="relative z-30 max-w-6xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          {/* TÍTULO PRINCIPAL */}
          <div
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none relative z-20 max-w-5xl w-full cursor-pointer select-none py-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              animate={{
                filter: isTitleHovered
                  ? "drop-shadow(0 0 30px rgba(255,230,128,0.9)) drop-shadow(0 0 12px rgba(232,184,0,0.8))"
                  : "drop-shadow(0 0 0px rgba(0,0,0,0))",
              }}
              className={isTitleHovered ? "text-transparent" : "text-white"}
            >
              ESPECIALISTAS EN{" "}
              <span
                className={
                  isTitleHovered
                    ? "bg-gradient-to-r from-black via-[#e8b800] to-white bg-clip-text text-transparent transition-all duration-300"
                    : "text-white transition-all duration-300"
                }
              >
                DOS MUNDOS
              </span>{" "}
              DE{" "}
              <span
                className={
                  isTitleHovered
                    ? "bg-gradient-to-r from-black via-[#ffe680] to-white bg-clip-text text-transparent transition-all duration-300"
                    : "text-white transition-all duration-300"
                }
              >
                ALTO IMPACTO
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xs md:text-sm text-[#e8b800] font-bold tracking-widest uppercase mt-6 mb-3"
          >
            A través de un Sistema Operativo Creativo
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-gray-400 text-xs md:text-sm font-light leading-relaxed space-y-1.5"
          >
            <p>
              La integración entre equipos es la herramienta más poderosa para
              construir una gran agencia.
            </p>
            <p>
              Diseñamos sistemas que permiten colaborar, alinear y escalar el
              trabajo de distintas áreas a través de nuestros siguientes{" "}
              <span className="text-[#e8b800] font-semibold underline decoration-[#e8b800]/50 underline-offset-4">
                servicios
              </span>
              .
            </p>
          </motion.div>
        </div>

        {/* CONTENEDOR DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto items-start">
          {specializations.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#e8b800]/60 overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(232,184,0,0.25)] flex flex-col cursor-pointer transition-all duration-500"
            >
              {/* CABECERA CON IMAGEN Y DEGRADADOS */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-900">
                <img
                  src={spec.bgImage}
                  alt={spec.title}
                  className="w-full h-full object-cover opacity-80 brightness-90 saturate-100 group-hover:opacity-100 group-hover:brightness-125 group-hover:saturate-150 group-hover:scale-110 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-[#e8b800]/40 via-amber-600/20 to-[#ffe680]/20 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/85 transition-all duration-500" />

                <div className="absolute top-4 left-5 flex items-center gap-2 z-10">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:scale-110 transition-transform duration-300">
                    {spec.number}
                  </span>
                  <motion.svg
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 text-[#e8b800]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </motion.svg>
                </div>

                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#e8b800] transition-colors duration-300">
                    {spec.title}
                  </h3>
                </div>
              </div>

              {/* CUERPO DE LA TARJETA */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 bg-transparent">
                {spec.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`group/item p-2 rounded-lg hover:bg-white/5 transition-all duration-300 ${
                      itemIdx !== spec.items.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-white group-hover/item:text-[#e8b800] transition-colors duration-300 mb-0.5">
                        {item.title}
                      </h4>
                      <span className="opacity-0 group-hover/item:opacity-100 text-[#e8b800] text-xs transition-opacity duration-300">
                        ➔
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
