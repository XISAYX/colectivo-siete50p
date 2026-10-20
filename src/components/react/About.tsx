import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      eyebrow: "MÁS QUE UNA AGENCIA",
      line1: "CONSTRUIMOS MARCAS",
      line2: "QUE TRASCIENDEN",
      description:
        "En Colectivo Siete50 somos apasionados por revolucionar la forma en que las marcas y las personas se comunican. Combinamos la potencia de la narrativa audiovisual con la precisión de la estrategia digital.",
      mediaType: "video",
      mediaSrc: "/video-1.mp4",
    },
    {
      eyebrow: "NARRATIVA Y ESTRATEGIA",
      line1: "HISTORIAS CON",
      line2: "PROPÓSITO",
      description:
        "No solo creamos contenido visual de alta calidad; transformamos ideas, marcas y proyectos en historias que conectan, inspiran y generan resultados reales.",
      mediaType: "image",
      mediaSrc: "/social-preview.webp",
    },
    {
      eyebrow: "ALIADO ESTRATÉGICO",
      line1: "VOZ, FORMA",
      line2: "Y MOVIMIENTO",
      description:
        "Somos tu aliado estratégico que le da voz, forma y movimiento a tu visión para marcas privadas y gobiernos que buscan trascender.",
      mediaType: "video",
      mediaSrc: "/video-2.mp4",
    },
  ];

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <section
      id="nosotros"
      className="relative w-full bg-black text-white py-20 px-6 overflow-hidden selection:bg-[#e8b800] selection:text-black flex items-center justify-center min-h-[85vh]"
    >
      <style>{`
        .gradient-text-brand {
          background: linear-gradient(135deg, #ffffff 30%, #e8b800 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Contenedor principal */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 z-10">
        {/* BLOQUE DE TEXTOS GENERAL */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* Cabecera superior estática */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${activeStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="w-8 sm:w-12 h-[2px] bg-[#e8b800]"></span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#e8b800] font-bold">
                {steps[activeStep].eyebrow}
              </span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#e8b800]"></span>
            </motion.div>
          </AnimatePresence>

          {/* TÍTULO GIGANTE: ZONA EXCLUSIVA DE INTERACCIÓN (HOVER / CLIC) */}
          <div
            onMouseEnter={() => {
              setIsHovered(true);
              handleNextStep();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleNextStep}
            className="cursor-pointer select-none py-2 px-4 inline-block"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeStep}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    filter: isHovered
                      ? "drop-shadow(0 0 30px rgba(255,230,128,0.9)) drop-shadow(0 0 12px rgba(232,184,0,0.8))"
                      : "drop-shadow(0 0 0px rgba(0,0,0,0))",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col tracking-tighter uppercase font-black text-3xl sm:text-5xl md:text-6xl leading-[1.05]"
                >
                  <span
                    className={
                      isHovered
                        ? "bg-gradient-to-r from-black via-[#e8b800] to-white bg-clip-text text-transparent transition-all duration-300"
                        : "text-white transition-all duration-300 drop-shadow-md"
                    }
                  >
                    {steps[activeStep].line1}
                  </span>
                  <span
                    className={
                      isHovered
                        ? "bg-gradient-to-r from-black via-[#ffe680] to-white bg-clip-text text-transparent transition-all duration-300 mt-1"
                        : "gradient-text-brand mt-1"
                    }
                  >
                    {steps[activeStep].line2}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Descripción oficial con animación */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 font-light text-xs sm:text-sm md:text-base max-w-xl leading-relaxed tracking-wide mt-2"
            >
              {steps[activeStep].description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CONTENEDOR MULTIMEDIA (FOTO / VIDEO) DINÁMICO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`media-${activeStep}`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl h-[210px] sm:h-[250px] md:h-[290px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

            {steps[activeStep].mediaType === "video" ? (
              <video
                src={steps[activeStep].mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={steps[activeStep].mediaSrc}
                alt="Colectivo Siete50"
                className="w-full h-full object-cover"
              />
            )}

            {/* Indicador sutil de fase */}
            <div className="absolute bottom-3 left-3 z-20 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#e8b800] uppercase">
              Fase 0{activeStep + 1} / Colectivo Siete50
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
