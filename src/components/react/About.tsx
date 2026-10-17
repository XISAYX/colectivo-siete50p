import React, { useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <section
      id="about"
      className="relative w-full bg-black py-28 sm:py-36 px-5 sm:px-8 md:px-12 overflow-hidden text-white"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      {/* CONTENIDO DE LA SECCIÓN CON ANIMACIONES TIPOGRÁFICAS FLUIDAS */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* SUBTÍTULO SUPERIOR CON LÍNEAS ANIMADAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 sm:gap-4 mb-6"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-[1px] bg-[#e8b800]"
          />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#e8b800] font-bold">
            SIETE50
          </span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-[1px] bg-[#e8b800]"
          />
        </motion.div>

        {/* TÍTULO PRINCIPAL CON EFECTOS DE MOVIMIENTO, GLOW Y GRADIENTE INTERACTIVO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleToggle}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.08] mb-8 cursor-pointer select-none py-2 w-full"
          style={{
            transform: "translate3d(0,0,0)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* PRIMERA LÍNEA */}
          <motion.span
            animate={{
              color: isHovered ? "transparent" : "#ffffff",
              textShadow: isHovered
                ? "0 0 25px rgba(232,184,0,0.5), 0 0 50px rgba(255,230,128,0.2)"
                : "0 0 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className={`block mb-2 transition-all duration-300 ${
              isHovered
                ? "bg-gradient-to-r from-white via-[#e8b800] to-white bg-clip-text text-transparent scale-[1.02]"
                : "text-white"
            }`}
            style={{ willChange: "transform, color" }}
          >
            Más que
          </motion.span>

          {/* SEGUNDA LÍNEA */}
          <motion.span
            animate={{
              color: isHovered ? "transparent" : "#ffffff",
              textShadow: isHovered
                ? "0 0 25px rgba(255,230,128,0.6), 0 0 50px rgba(232,184,0,0.3)"
                : "0 0 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className={`inline-block transition-all duration-300 ${
              isHovered
                ? "bg-gradient-to-r from-[#ffe680] via-[#e8b800] to-white bg-clip-text text-transparent scale-[1.02]"
                : "text-white"
            }`}
            style={{ willChange: "transform, color" }}
          >
            una agencia
          </motion.span>
        </motion.div>

        {/* DESCRIPCIÓN CON APARICIÓN SUAVE */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xs sm:max-w-xl md:max-w-3xl text-gray-400 text-xs sm:text-sm md:text-base font-light leading-relaxed px-2 sm:px-0"
        >
          En Colectivo Siete50 somos apasionados por revolucionar la forma en
          que las marcas y las personas se comunican. Ya sea a través de videos,
          imágenes, fotografías o identidades visuales. Buscamos impulsar
          contenidos impactantes y creativos.
        </motion.p>
      </div>
    </section>
  );
}
