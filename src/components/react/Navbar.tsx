import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);

  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 2.5;

      if (currentScrollY > heroThreshold) {
        setIsHeroActive(false);
      } else {
        setIsHeroActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --brand-yellow: #e8b800;
          --line: rgba(255, 255, 255, 0.1);
          --text: #ffffff;
          --soft: rgba(255, 255, 255, 0.8);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          font-family: "Geist", "Inter", system-ui, sans-serif;
          color: var(--text);
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }

        .hide-outside-hero {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-10px);
          transition: opacity 0.35s var(--ease), transform 0.35s var(--ease), visibility 0.35s;
        }

        .logo, .desktop-nav {
          transition: opacity 0.35s var(--ease), transform 0.35s var(--ease), visibility 0.35s;
        }

        .bar {
          height: 76px;
          padding: 0 clamp(20px, 3.4vw, 52px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .desktop-nav {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .desktop-nav.visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .plain-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 0;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--soft);
          transition: color 0.25s ease;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .plain-link:hover {
          color: var(--brand-yellow);
        }

        .menu-btn {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease;
          z-index: 60;
        }

        .menu-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .menu-line {
          display: block;
          width: 22px;
          height: 2px;
          background-color: #fff;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }

        /* Estilos Responsive para Menú Móvil */
        @media (max-width: 768px) {
          .desktop-nav {
            position: fixed;
            top: 76px;
            left: 0;
            right: 0;
            background: rgba(10, 12, 16, 0.96);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--line);
            padding: 24px;
            transform: translateY(-20px);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .desktop-nav.visible {
            transform: translateY(0);
          }

          .links {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 16px;
          }
        }
      `}</style>

      <header className="navbar-header" id="header" ref={headerRef}>
        <div className="bar">
          {/* Logo con enlace directo al Hero */}
          <a
            href="#hero"
            className={`logo ${!isHeroActive ? "hide-outside-hero" : ""}`}
            aria-label="Home"
          >
            <img
              src="/logo.webp"
              alt="Colectivo Siete50"
              style={{ height: "34px", width: "auto", objectFit: "contain" }}
            />
          </a>

          <nav
            className={`desktop-nav ${isMobileOpen ? "visible" : ""} ${
              !isHeroActive ? "hide-outside-hero" : ""
            }`}
            id="nav"
            aria-label="Main"
            ref={navRef}
          >
            <ul className="links">
              <li>
                <a
                  className="plain-link"
                  href="#hero"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Inicio
                </a>
              </li>

              <li>
                <a
                  className="plain-link"
                  href="#divisions"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Servicios
                </a>
              </li>

              <li>
                <a
                  className="plain-link"
                  href="#colaboradores"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Colaboradores
                </a>
              </li>

              <li>
                {/* Modificado únicamente para apuntar a la página independiente */}
                <a
                  className="plain-link"
                  href="/contacto"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Botón de menú responsive */}
          <div className="actions">
            <button
              className="menu-btn"
              id="menu-btn"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileOpen(!isMobileOpen);
              }}
            >
              <span className="menu-line"></span>
              <span className="menu-line line-bottom"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
