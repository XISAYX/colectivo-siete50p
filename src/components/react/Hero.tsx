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
  animationStiffness?: number;
  animationDamping?: number;
  animationMass?: number;
}

export default function Hero({
  videoUrl = "/videoh.webm",
  autoPlay = true,
  loop = true,
  muted = true,
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
        {/* BLOQUE TIPOGRÁFICO MAESTRO MANUAL */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
            fontFamily: "'Montserrat', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            className="relative flex flex-col items-center justify-center w-full px-4"
          >
            <div className="relative flex flex-col w-[50rem] max-w-[95vw]">
              {/* ========================================== */}
              {/* 1. ideas */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-10"
                style={{ marginTop: "0rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-black text-white uppercase sm:lowercase inline-block"
                  style={{
                    fontSize: "clamp(5.5rem, 11.6vw, 11.5rem)",
                    lineHeight: 0.75,
                    letterSpacing: "-0.05em",
                    marginLeft: "17rem",
                  }}
                >
                  ideas
                </motion.span>
              </div>

              {/* ========================================== */}
              {/* 2. que mueven */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-30"
                style={{ marginTop: "-1.5rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-black text-[#e8b800] inline-block"
                  style={{
                    fontSize: "clamp(4.5rem, 3.8vw, 4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    marginLeft: "17rem",
                  }}
                >
                  que mueven
                </motion.span>
              </div>

              {/* ========================================== */}
              {/* 3. marcas */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-20"
                style={{ marginTop: "-1.8rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-black text-white inline-block"
                  style={{
                    fontSize: "clamp(4.5rem, 10.5vw, 11.5rem)",
                    lineHeight: 0.75,
                    letterSpacing: "-0.05em",
                    marginLeft: "10rem",
                  }}
                >
                  marcas
                </motion.span>
              </div>

              {/* ========================================== */}
              {/* 4. estrategias */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-10"
                style={{ marginTop: "-1rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-light text-white inline-block whitespace-nowrap relative"
                  style={{
                    fontSize: "clamp(3.8rem, 7.5vw, 10rem)",
                    lineHeight: 0.75,
                    letterSpacing: "-0.025em",
                    marginLeft: "10rem",
                  }}
                >
                  estrategias
                </motion.span>
              </div>

              {/* ========================================== */}
              {/* 5. que generan */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-30"
                style={{ marginTop: "-0.7rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-black text-[#e8b800] inline-block"
                  style={{
                    fontSize: "clamp(1.5rem, 3.8vw, 4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    marginLeft: "10rem",
                  }}
                >
                  que generan
                </motion.span>
              </div>

              {/* ========================================== */}
              {/* 6. impacto */}
              {/* ========================================== */}
              <div
                className="w-full text-left z-10"
                style={{ marginTop: "-1.4rem" }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-black text-white inline-block"
                  style={{
                    fontSize: "clamp(4.5rem, 11.5vw, 11.5rem)",
                    lineHeight: 0.75,
                    letterSpacing: "-0.05em",
                    marginLeft: "6rem",
                  }}
                >
                  impacto
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CONTENEDOR DEL VIDEO CENTRAL */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 25,
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
                // @ts-ignore
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
