import React from "react";

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-[#08080c] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Columna de Texto */}
          <div>
            <span className="text-[#e8b800] font-bold tracking-widest uppercase text-sm mb-4 block">
              “Más que una agencia”
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Construimos marcas privadas y{" "}
              <span className="text-[#e8b800]">gobiernos que trascienden.</span>
            </h2>

            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                En <strong className="text-white">Colectivo Siete50</strong>{" "}
                somos apasionados por revolucionar la forma en que las marcas y
                las personas se comunican. Combinamos la potencia de la
                narrativa audiovisual con la precisión de la estrategia digital.
                No solo creamos contenido visual de alta calidad; transformamos
                ideas, marcas y proyectos en historias con propósito que
                conectan, inspiran y generan resultados reales. Somos tu aliado
                estratégico que le da voz, forma y movimiento a tu visión.
              </p>
              <p className="text-white font-semibold">
                Especializados en creación de contenido. Expertos en consultoría
                de medios gubernamentales y dependencias.
              </p>
              <p>
                Desde videos virales hasta estrategias de comunicación para
                empresas o gobiernos, ponemos nuestra creatividad y expertise al
                servicio de tus objetivos. Nuestro enfoque estratégico te
                garantiza resultados de alta calidad que generan un impacto en
                tu audiencia. Estamos ubicados en Actopan, Hidalgo pero
                trabajamos con clientes de todo México, somos tu equipo de
                ensueño para hacer realidad tus visiones más creativas.
              </p>
              <p className="text-[#e8b800] text-2xl font-bold mt-4 pt-4 border-t border-gray-800">
                Con 10 años de experiencia
              </p>
            </div>
          </div>

          {/* Columna de Imagen (Con el Logo) */}
          <div className="flex justify-center items-center">
            <img
              src="/logo.webp"
              alt="Logo Colectivo Siete50"
              className="w-full max-w-md object-contain drop-shadow-[0_0_30px_rgba(232,184,0,0.15)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
