import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/site-data";
import { VoxelHeader } from "./VoxelHeader";

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="work" className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <VoxelHeader />

      {/* Centre stage */}
      <div className="relative z-10 flex justify-center px-6">
        <div className="relative aspect-[3/4] w-[52vw] max-w-[280px] md:w-[16vw]">
          {HERO_SLIDES.map((s, idx) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.label}
              loading={idx === 0 ? "eager" : "lazy"}
              className={`duotone absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                idx === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hairline + rails */}
      <div className="pointer-events-none absolute inset-x-0 top-[58%] z-0 hidden h-px bg-[color-mix(in_srgb,var(--theme-text)_28%,transparent)] md:block" />

      <div className="absolute inset-x-0 top-[58%] z-20 flex items-start justify-between px-5 pt-4 md:px-8">
        <p className="display-xl max-w-[9ch] text-[7vw] md:max-w-[24ch] md:text-[1.6vw] md:leading-[1.05]">
          Great work speaks
          <br className="hidden md:block" /> with purpose
        </p>
        <div className="mono-label relative hidden h-4 w-[22ch] overflow-hidden text-right md:block">
          {HERO_SLIDES.map((s, idx) => (
            <span
              key={s.label}
              className={`absolute inset-x-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                idx === i
                  ? "translate-y-0 opacity-100"
                  : idx === (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <p className="mono-label absolute bottom-6 left-5 z-20 opacity-60 md:left-8">
        See things differently
      </p>
    </section>
  );
}
