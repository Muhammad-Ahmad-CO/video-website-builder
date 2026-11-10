import { useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/site-data";

/*
 * The film's hero: a giant condensed initial at the top-left and another at
 * the bottom-right, a small photo cycling in the centre with its service
 * label, and a thin wavy line running behind everything. Scrolling the
 * first viewport pushes the two letters out of frame.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [exit, setExit] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.9)));
        setExit(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* Giant initials */}
      <span
        aria-hidden
        className="display-xl pointer-events-none absolute -top-[4vh] left-1 z-0 leading-none select-none md:left-2"
        style={{
          fontSize: "44vh",
          transform: `translate(${-exit * 46}%, ${-exit * 20}%)`,
          opacity: 1 - exit * 0.85,
        }}
      >
        M
      </span>
      <span
        aria-hidden
        className="display-xl pointer-events-none absolute -right-1 -bottom-[6vh] z-0 leading-none select-none md:right-2"
        style={{
          fontSize: "44vh",
          transform: `translate(${exit * 46}%, ${exit * 22}%)`,
          opacity: 1 - exit * 0.85,
        }}
      >
        A
      </span>
      <h1 className="sr-only">Muhammad Ahmad — Creative &amp; Design Director</h1>

      {/* Wavy hairline */}
      <svg
        aria-hidden
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[56%] z-0 hidden h-[60px] w-full opacity-40 md:block"
      >
        <path
          d="M0 30 C 180 6, 360 54, 540 30 S 900 6, 1080 30 S 1350 48, 1440 30"
          fill="none"
          stroke="var(--theme-text)"
          strokeWidth="1"
        />
      </svg>

      {/* Centre stage */}
      <div className="relative z-10 flex justify-center px-6">
        <div className="relative aspect-[3/4] w-[52vw] max-w-[280px] md:w-[15vw]">
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

      {/* Rails: statement left, service label right */}
      <div className="absolute inset-x-0 top-[58%] z-20 flex items-start justify-between px-5 pt-4 md:px-8">
        <p className="display-xl max-w-[9ch] text-[7vw] md:max-w-[24ch] md:text-[1.6vw] md:leading-[1.05]">
          Great work speaks
          <br className="hidden md:block" /> with purpose
        </p>
        <div className="mono-label relative hidden h-4 w-[24ch] overflow-hidden text-right md:block">
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
