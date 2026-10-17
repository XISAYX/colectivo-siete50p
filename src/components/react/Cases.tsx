import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

function wrapIndex(i: number, count: number) {
  if (count <= 0) return 0;
  return ((i % count) + count) % count;
}

export default function Cases() {
  const [active, setActive] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.35 });

  // Referencias para controlar la reproducción de cada video en el carrusel
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const carouselItems = [
    {
      title: "CASO 01",
      fallbackVideo: "/c1.webm",
    },
    {
      title: "CASO 02",
      fallbackVideo: "/c2.webm",
    },
    {
      title: "CASO 03",
      fallbackVideo: "/c3.webm",
    },
    {
      title: "CASO 04",
      fallbackVideo: "/c4.webm",
    },
  ];

  const count = carouselItems.length;

  const goTo = React.useCallback(
    (nextRaw: number) => {
      const next = wrapIndex(nextRaw, count);
      React.startTransition(() => setActive(next));
    },
    [count],
  );

  // Reproducción inteligente: solo reproduce el video activo al frente
  React.useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      const isActive = i === active && inView;
      if (isActive) {
        v.muted = muted;
        v.playsInline = true;
        v.loop = true;
        v.play().catch(() => {});
      } else {
        v.pause();
        v.muted = true;
      }
    });
  }, [active, inView, muted]);

  return (
    <section
      id="cases"
      ref={containerRef}
      className="relative z-30 w-full bg-black pb-28 pt-10 px-6 md:px-12 overflow-hidden text-white"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      <div className="relative z-30 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* SUBTÍTULO Y ENCABEZADO */}
        <span className="text-xs uppercase tracking-[0.3em] text-[#e8b800] mb-4 font-semibold">
          — Hechos a tu medida —
        </span>

        {/* TÍTULO PRINCIPAL: MÁS GRANDE Y CON EL MISMO DISEÑO DE HOVER */}
        <div
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
          className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-4 cursor-pointer select-none py-2"
        >
          <motion.div
            animate={{
              filter: isTitleHovered
                ? "drop-shadow(0 0 30px rgba(255,230,128,0.9)) drop-shadow(0 0 12px rgba(232,184,0,0.8))"
                : "drop-shadow(0 0 0px rgba(0,0,0,0))",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={isTitleHovered ? "text-transparent" : "text-white"}
          >
            <span
              className={
                isTitleHovered
                  ? "bg-gradient-to-r from-black via-[#e8b800] to-white bg-clip-text text-transparent transition-all duration-300"
                  : "text-white transition-all duration-300"
              }
            >
              PARA
            </span>{" "}
            <span
              className={
                isTitleHovered
                  ? "bg-gradient-to-r from-black via-[#ffe680] to-white bg-clip-text text-transparent transition-all duration-300"
                  : "text-white transition-all duration-300"
              }
            >
              TI
            </span>
          </motion.div>
        </div>

        <p className="max-w-3xl text-gray-400 text-sm md:text-base font-light leading-relaxed mb-16">
          Nos especializamos en creación de contenido para TikTok, Instagram y
          Facebook.
        </p>

        {/* CARRUSEL 3D */}
        <div className="relative w-full max-w-[850px] h-[480px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center perspective-[1400px]">
            {carouselItems.map((item, i) => {
              const diff = (i - active + count) % count;

              let xOffset = 0;
              let scale = 0.7;
              let opacity = 0.3;
              let zIndex = 10;
              let filter = "blur(6px)";
              let rotateY = 0;

              if (diff === 0) {
                xOffset = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
                filter = "blur(0px)";
                rotateY = 0;
              } else if (diff === 1 || diff === -3) {
                xOffset = 240;
                scale = 0.82;
                opacity = 0.5;
                zIndex = 20;
                filter = "blur(4px)";
                rotateY = -12;
              } else if (diff === count - 1 || diff === -1) {
                xOffset = -240;
                scale = 0.82;
                opacity = 0.5;
                zIndex = 20;
                filter = "blur(4px)";
                rotateY = 12;
              } else {
                xOffset = diff > 1 ? 400 : -400;
                scale = 0.65;
                opacity = 0.2;
                zIndex = 5;
                filter = "blur(8px)";
                rotateY = diff > 1 ? -18 : 18;
              }

              const isActive = diff === 0;

              return (
                <motion.div
                  key={i}
                  onClick={() => goTo(i)}
                  className="absolute w-[260px] h-[400px] rounded-[22px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer border border-white/10 flex flex-col items-center justify-center"
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                    filter,
                    rotateY,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 32,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Botón Mute solo en la tarjeta frontal */}
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMuted(!muted);
                      }}
                      className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md shadow-md flex items-center justify-center text-white hover:bg-black/80 transition cursor-pointer border border-white/20"
                      aria-label="Control de audio"
                    >
                      {muted ? "🔇" : "🔊"}
                    </button>
                  )}

                  {/* Video del Carrusel */}
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black flex items-center justify-center">
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={item.fallbackVideo}
                      muted={isActive ? muted : true}
                      playsInline
                      loop
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* INDICADORES DE PUNTOS */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {carouselItems.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goTo(dotIdx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === dotIdx
                  ? "w-8 bg-[#e8b800]"
                  : "w-2.5 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Ir a diapositiva ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
