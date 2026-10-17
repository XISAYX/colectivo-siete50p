"use client";

import React, { useState } from "react";

export default function WhatsAppButton(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Número limpio garantizado
  const rawNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "527711773105";
  const cleanNumber = rawNumber.replace(/\D/g, "");

  // 2. Mensaje exacto codificado
  const defaultMessage = encodeURIComponent(
    "¡Hola! Me gustaría recibir información sobre los servicios de Colectivo Siete50.",
  );

  // 3. ENLACE EXACTO para mostrar la interfaz web de la API de WhatsApp
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanNumber}&text=${defaultMessage}&type=phone_number&app_absent=0`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans selection:bg-[#25D366]/30">
      {/* Ventana flotante integrada */}
      {isOpen && (
        <div className="w-[340px] max-w-[calc(100vw-2rem)] bg-[#F0F2F5] rounded-[28px] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.35)] border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Encabezado Verde Claro WhatsApp (#25D366) */}
          <div className="bg-[#25D366] p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {/* Contenedor de Foto de Perfil */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 bg-white/20 flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Colectivo Siete50"
                  className="w-full h-full object-cover relative z-10 bg-[#111111]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <svg
                  className="w-6 h-6 fill-white absolute"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-[16px] tracking-wide leading-tight drop-shadow-sm">
                  Colectivo Siete50
                </span>
                <span className="text-[11px] text-white/90 font-medium">
                  En línea
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div className="relative self-start max-w-[90%] bg-white text-[#111B21] rounded-2xl p-4 shadow-[0_1px_1px_rgba(0,0,0,0.12)] text-[13.5px] leading-relaxed">
              <span className="font-semibold block mb-1">¡Hola! </span>
              Me gustaría recibir información sobre los servicios de Colectivo
              Siete50.
              <div
                className="absolute left-[-6px] top-4 w-3.5 h-3 bg-white transform rotate-45 rounded-sm"
                style={{ clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)" }}
              />
            </div>

            {/* Botón CTA Verde Claro WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-full font-bold text-[15px] shadow-[0_3px_12px_rgba(37,211,102,0.4)] transition-all duration-300 transform active:scale-98 group cursor-pointer"
            >
              <span>WhatsApp Aquí</span>
              <svg
                className="w-5 h-5 fill-none stroke-current transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante circular principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.5)] transition-all duration-300 transform hover:scale-110 active:scale-90 cursor-pointer"
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </button>
    </div>
  );
}
