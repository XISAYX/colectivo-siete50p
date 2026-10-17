import React, { useRef, useEffect, useState, startTransition } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type ScreenSize = "desktop" | "tablet" | "mobile";

interface ResponsiveConfig {
  startWidth: string;
  startHeight: string;
  startTop: string;
  startLeft: string;
}

const RESPONSIVE: Record<ScreenSize, ResponsiveConfig> = {
  desktop: {
    startWidth: "7vw",
    startHeight: "15vh",
    startTop: "32%",
    startLeft: "36.8%",
  },
  tablet: {
    startWidth: "8.5vw",
    startHeight: "13.5vh",
    startTop: "32%",
    startLeft: "36.8%",
  },
  mobile: {
    startWidth: "42vw",
    startHeight: "10.5vh",
    startTop: "78%",
    startLeft: "50%",
  },
};

interface HeroProps {
  videoUrl?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  backgroundImage?: string;
  animationStiffness?: number;
  animationDamping?: number;
  animationMass?: number;
}

export default function Hero({
  videoUrl = "/videoh.webm",
  autoPlay = true,
  loop = true,
  muted = true,
  backgroundImage = "/fondohero.webp",
  animationStiffness = 180,
  animationDamping = 35,
  animationMass = 0.2,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [screen, setScreen] = useState<ScreenSize>("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 810) {
        startTransition(() => setScreen("mobile"));
      } else if (window.innerWidth <= 1799) {
        startTransition(() => setScreen("tablet"));
      } else {
        startTransition(() => setScreen("desktop"));
      }
    };

    handleResize();
    setMounted(true);

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const current = RESPONSIVE[screen];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 1],
    [current.startWidth, "100vw"],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 1],
    [current.startHeight, "100vh"],
  );

  const topPos = useTransform(
    scrollYProgress,
    [0, 1],
    [current.startTop, "50%"],
  );
  const leftPos = useTransform(
    scrollYProgress,
    [0, 1],
    [current.startLeft, "50%"],
  );

  const rawRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const borderRadius = useSpring(rawRadius, {
    stiffness: animationStiffness,
    damping: animationDamping,
    mass: animationMass,
    restDelta: 0.00001,
  });

  // Forzar reproducción y evitar bloqueos en móviles
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playVideo = (e: Event) => {
      e.stopPropagation();
      if (autoPlay) {
        videoEl.play().catch(() => {});
      }
    };

    playVideo(new Event("init"));
    document.addEventListener("touchstart", playVideo, {
      once: true,
      capture: true,
    });
    document.addEventListener("click", playVideo, {
      once: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("touchstart", playVideo, true);
      document.removeEventListener("click", playVideo, true);
    };
  }, [autoPlay]);

  return (
    <section
      ref={ref}
      onTouchStart={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        height: "350vh",
        position: "relative",
        width: "100%",
        pointerEvents: "auto",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* FONDO TIPOGRÁFICO FIJO */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            padding: "3vw",
            pointerEvents: "none",
          }}
        >
          <motion.img
            src={backgroundImage}
            alt="Fondo tipográfico Colectivo Siete50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              maxWidth: "85vw",
              maxHeight: "80vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              willChange: "opacity",
            }}
            draggable={false}
          />
        </div>

        {/* CONTENEDOR DEL VIDEO */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
            }
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width,
              height,
              borderRadius,
              overflow: "hidden",
              position: "absolute",
              top: topPos,
              left: leftPos,
              x: "-50%",
              y: "-50%",
              flexShrink: 0,
              background: "#000000",
              willChange: "width, height, border-radius",
              backfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)",
              pointerEvents: "auto",
            }}
          >
            {videoUrl && (
              <video
                ref={videoRef}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                webkit-playsinline="true"
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "translate3d(0,0,0)",
                }}
              >
                <source src={videoUrl} type="video/webm" />
              </video>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
