"use client";

import React, { useState } from "react";
// @ts-ignore
import CrystalizedBall from "../CrystalizedBall.jsx";
// @ts-ignore
import LogoLoop from "../LogoLoop.jsx";

const brandLogos = [
  {
    src: "/PerlaL.webp",
    alt: "La Perla Hamburguesas",
  },
  {
    src: "/cinemanias.webp",
    alt: "Cinemanías",
  },
  {
    src: "/ohlala.webp",
    alt: "Ohlala!",
  },
  {
    src: "/uti.webp",
    alt: "Universidad Técnica Internacional",
  },
  {
    src: "/viadorada.webp",
    alt: "Grand Hotel & Casino Viadorada",
  },
  {
    src: "/yari.webp",
    alt: "Yari Joyería de Plata",
  },
  {
    src: "/vicke.webp",
    alt: "Vicke Concept House KF",
  },
  {
    src: "/actopan.webp",
    alt: "Actopan Gobierno Municipal",
  },
  {
    src: "/Gilberto López Islas.webp",
    alt: "Gilberto López Islas",
  },
];

export default function ContactSection(): React.JSX.Element {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    brief: "",
  });

  const [botField, setBotField] = useState("");

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    brief: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateNombre = (nombre: string): string => {
    if (!nombre.trim()) return "El nombre es obligatorio.";
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    if (!regex.test(nombre.trim()))
      return "Ingresa un nombre valido (solo letras).";
    if (nombre.trim().split(/\s+/).length < 2)
      return "Ingresa tu nombre y apellido.";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "El correo electronico es obligatorio.";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email.trim()))
      return "Ingresa un correo electronico valido (ej. correo@dominio.com).";
    return "";
  };

  const validateTelefono = (telefono: string): string => {
    if (!telefono.trim()) return "El telefono es obligatorio.";
    if (telefono.length !== 10)
      return "El telefono debe tener exactamente 10 digitos.";
    const InvalidPatterns = [
      "0000000000",
      "1234567890",
      "1111111111",
      "9999999999",
    ];
    if (InvalidPatterns.includes(telefono) || /^(\d)\1{9}$/.test(telefono)) {
      return "Ingresa un numero de telefono real.";
    }
    return "";
  };

  const validateBrief = (brief: string): string => {
    if (!brief.trim()) return "Por favor platicanos sobre tu proyecto.";
    if (brief.trim().length < 15)
      return "Escribe un mensaje mas detallado (minimo 15 caracteres).";
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: onlyNums });
      setErrors({ ...errors, telefono: validateTelefono(onlyNums) });
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (name === "nombre")
      setErrors({ ...errors, nombre: validateNombre(value) });
    if (name === "email") setErrors({ ...errors, email: validateEmail(value) });
    if (name === "brief") setErrors({ ...errors, brief: validateBrief(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (botField !== "") {
      setSubmittedSuccess(true);
      return;
    }

    const nombreErr = validateNombre(formData.nombre);
    const emailErr = validateEmail(formData.email);
    const telefonoErr = validateTelefono(formData.telefono);
    const briefErr = validateBrief(formData.brief);

    if (nombreErr || emailErr || telefonoErr || briefErr) {
      setErrors({
        nombre: nombreErr,
        email: emailErr,
        telefono: telefonoErr,
        brief: briefErr,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          company: "",
          division: "General",
          channel: "Email",
          message: formData.brief,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.ok || result.success)) {
        setSubmittedSuccess(true);
        setFormData({ nombre: "", email: "", telefono: "", brief: "" });
        setErrors({ nombre: "", email: "", telefono: "", brief: "" });

        setTimeout(() => {
          setSubmittedSuccess(false);
        }, 5000);
      } else {
        setSubmitError(
          result.message || "Error al enviar el mensaje. Intenta mas tarde.",
        );
      }
    } catch (err) {
      setSubmitError("Error de conexion con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black text-white overflow-hidden py-10 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-center z-30"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout style paint",
      }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-60 md:opacity-70 z-0">
        {/* @ts-ignore */}
        <CrystalizedBall
          preset="plasma"
          color="#e8b800"
          size={0.71}
          crackle={0.85}
          fill={0.5}
          interactive
          hoverStrength={0.7}
          particleCount={30000}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:via-black/70 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col items-start w-full max-w-lg mx-auto lg:mx-0">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#e8b800] font-bold mb-1">
            CONTACTANOS
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-4 leading-tight">
            IMAGINA COMO <span className="text-[#e8b800]">SERIA SI...</span>
          </h2>

          {submittedSuccess ? (
            <div className="w-full bg-[#121218]/90 border border-[#e8b800] rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(232,184,0,0.2)]">
              <h3 className="text-lg font-bold text-[#e8b800] uppercase mb-1">
                MENSAJE ENVIADO CON EXITO
              </h3>
              <p className="text-xs text-gray-300">
                Nos pondremos en contacto contigo muy pronto.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3 sm:gap-4"
              noValidate
            >
              <input
                type="text"
                name="company_website_url"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  NOMBRE
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre y Apellido"
                  required
                  className={`w-full bg-[#121218]/80 backdrop-blur-md border ${
                    errors.nombre ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e8b800] transition-colors`}
                />
                {errors.nombre && (
                  <span className="text-[10px] text-red-400 mt-0.5 font-medium">
                    {errors.nombre}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className={`w-full bg-[#121218]/80 backdrop-blur-md border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e8b800] transition-colors`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-400 mt-0.5 font-medium">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  TELEFONO
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="10 digitos (ej. 7712345678)"
                  maxLength={10}
                  required
                  className={`w-full bg-[#121218]/80 backdrop-blur-md border ${
                    errors.telefono ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e8b800] transition-colors`}
                />
                {errors.telefono && (
                  <span className="text-[10px] text-red-400 mt-0.5 font-medium">
                    {errors.telefono}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  EN QUE TE AYUDAMOS?
                </label>
                <textarea
                  name="brief"
                  rows={3}
                  value={formData.brief}
                  onChange={handleChange}
                  placeholder="Cuentanos brevemente el proyecto, marca o pregunta."
                  required
                  className={`w-full bg-[#121218]/80 backdrop-blur-md border ${
                    errors.brief ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e8b800] transition-colors resize-none`}
                />
                {errors.brief && (
                  <span className="text-[10px] text-red-400 mt-0.5 font-medium">
                    {errors.brief}
                  </span>
                )}
              </div>

              {submitError && (
                <span className="text-xs text-red-400 font-medium mt-1">
                  {submitError}
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 px-8 py-3 bg-[#e8b800] hover:bg-[#ffd700] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(232,184,0,0.3)] cursor-pointer w-full sm:w-fit disabled:opacity-50"
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR"}{" "}
                <span className="text-base">&rarr;</span>
              </button>
            </form>
          )}
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-3 py-2 text-center">
          <div className="flex items-center gap-3">
            <span className="w-8 sm:w-10 h-[2px] bg-[#e8b800]"></span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#e8b800] font-bold">
              COLABORADORES
            </span>
            <span className="w-8 sm:w-10 h-[2px] bg-[#e8b800]"></span>
          </div>

          <p className="max-w-md text-white/90 text-xs sm:text-sm font-light leading-relaxed px-2">
            Marcas que forman parte de Colectivo Siete50
          </p>

          <div className="w-full h-[120px] sm:h-[140px] relative overflow-hidden flex items-center mt-1">
            {/* @ts-ignore */}
            <LogoLoop
              logos={brandLogos.map((logo: any) => ({
                ...logo,
                node: (
                  <div className="w-[140px] sm:w-[170px] h-[75px] sm:h-[90px] flex items-center justify-center px-3 bg-transparent">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-[110px] max-h-[50px] sm:max-w-[130px] sm:max-h-[65px] w-auto h-auto object-contain mix-blend-screen brightness-125 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                    />
                  </div>
                ),
              }))}
              speed={80}
              direction="left"
              logoHeight={95}
              gap={50}
              hoverSpeed={0}
              scaleOnHover={false}
              fadeOut={true}
              fadeOutColor="transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
