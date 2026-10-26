"use client";

import React from "react";
// @ts-ignore
import { RevealText } from "../reveal-text";
import TubesCursor from "@/components/tubes-cursor";

export default function About(): React.JSX.Element {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden z-30"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      {/* Fondo interactivo TubesCursor */}
      <div className="absolute inset-0 pointer-events-auto z-10 opacity-70">
        <TubesCursor />
      </div>

      {/* Contenido principal de la sección */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-8 py-20 pointer-events-none">
        {/* Título principal en Black (900) */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-1 pointer-events-auto">
          <RevealText
            size="h1"
            as="h1"
            stagger={0.02}
            delay={0.1}
            duration={0.85}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] text-center"
          >
            Construimos Marcas Privadas &
          </RevealText>
          <RevealText
            size="h1"
            as="h1"
            stagger={0.02}
            delay={0.2}
            duration={0.85}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] text-center"
          >
            Gobiernos que Trascienden.
          </RevealText>
        </div>

        {/* Bloque descriptivo */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-4 pointer-events-auto">
          {/* Subtítulo en Medium (500) */}
          <RevealText
            size="base"
            as="h3"
            stagger={0.015}
            delay={0.3}
            duration={0.85}
            className="text-[#e8b800] text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase text-center"
          >
            “Más que una agencia”
          </RevealText>

          {/* Párrafo en Thin (100) */}
          <RevealText
            size="base"
            as="p"
            stagger={0.01}
            delay={0.4}
            duration={0.85}
            className="text-gray-400 text-sm sm:text-base md:text-lg font-thin leading-relaxed text-center"
          >
            En Colectivo Siete50 somos apasionados por revolucionar la forma en
            que las marcas y las personas se comunican. Combinamos la potencia
            de la narrativa audiovisual con la precisión de la estrategia
            digital. No solo creamos contenido visual de alta calidad;
            transformamos ideas, marcas y proyectos en historias con propósito
            que conectan, inspiran y generan resultados reales. Somos tu aliado
            estratégico que le da voz, forma y movimiento a tu visión.
          </RevealText>
        </div>

        {/* Enlaces inferiores minimalistas con iconos blancos puros */}
        <div className="flex items-center justify-center gap-8 mt-6 relative z-30 pointer-events-auto">
          <a
            href="#divisions"
            className="group flex items-center gap-2.5 text-white font-medium text-sm sm:text-base tracking-wide hover:text-[#e8b800] transition-colors duration-300"
          >
            <span>Portafolio</span>
            <svg
              className="w-5 h-5 text-white group-hover:text-[#e8b800] group-hover:rotate-45 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-2.5 text-white font-medium text-sm sm:text-base tracking-wide hover:text-[#e8b800] transition-colors duration-300"
          >
            <span>Contacto</span>
            <svg
              className="w-5 h-5 text-white group-hover:text-[#e8b800] group-hover:scale-110 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
