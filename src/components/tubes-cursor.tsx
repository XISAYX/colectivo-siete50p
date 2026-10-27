import React, { useEffect, useRef } from "react";

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count).fill(0).map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0"),
    );
  };

  useEffect(() => {
    let isMounted = true;

    const initTimer = setTimeout(() => {
      import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js")
        .then((module) => {
          if (!isMounted) return;
          const TubesCursorFn = module.default;

          if (canvasRef.current) {
            const app = TubesCursorFn(canvasRef.current, {
              tubes: {
                colors: ["#5e72e4", "#8965e0", "#f5365c"],
                lights: {
                  intensity: 200,
                  colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
                },
              },
            });
            appRef.current = app;
          }
        })
        .catch((err) =>
          console.error("Failed to load TubesCursor module:", err),
        );
    }, 100);

    const handleClick = () => {
      if (appRef.current) {
        const newTubeColors = randomColors(3);
        const newLightColors = randomColors(4);
        if (appRef.current.tubes) {
          appRef.current.tubes.setColors(newTubeColors);
          appRef.current.tubes.setLightsColors(newLightColors);
        }
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      isMounted = false;
      clearTimeout(initTimer);
      window.removeEventListener("click", handleClick);
      if (appRef.current && typeof appRef.current.dispose === "function") {
        appRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black font-['Montserrat',_sans-serif] overflow-hidden pointer-events-none z-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-auto cursor-pointer"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
