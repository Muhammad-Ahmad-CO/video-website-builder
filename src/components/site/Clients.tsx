import { useRef, useState } from "react";
import { CLIENTS } from "@/lib/site-data";

export function Clients() {
  const [hover, setHover] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="grid gap-10 pb-16 md:grid-cols-12 md:gap-8 md:pb-28">
        <h2
          data-reveal
          className="display-xl reveal col-span-12 max-w-[14ch] text-[10vw] md:col-span-5 md:text-[3.2vw]"
        >
          Great work happens with great people
        </h2>
        <p
          data-reveal
          data-reveal-delay="120"
          className="reveal col-span-12 max-w-[46ch] self-end text-[0.95rem] leading-relaxed md:col-span-5 md:col-start-8"
        >
          I&rsquo;ve worked with global brands, category leaders, and independent visionaries across
          industries. I&rsquo;m most drawn to those shaping how people enjoy the world.
        </p>
      </div>

      <div ref={wrap} onMouseMove={onMove} className="relative">
        <ul>
          {CLIENTS.map((c, idx) => (
            <li key={c.name} data-reveal className="reveal" data-reveal-delay={String(idx * 40)}>
              <button
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(null)}
                className="hairline group flex w-full items-center justify-between py-4 text-left transition-[padding] duration-500 hover:pl-3 md:py-5"
              >
                <span className="text-[1rem] md:text-[1.05rem]">{c.name}</span>
                <span className="mono-label flex items-center gap-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  View Project
                  <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-current text-[8px] leading-none">
                    +
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="hairline" />

        {/* Cursor-following preview */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
          style={{ transform: `translate3d(${pos.x - 110}px, ${pos.y - 140}px, 0)` }}
        >
          {CLIENTS.map((c, idx) => (
            <img
              key={c.name}
              src={c.src}
              alt=""
              loading="lazy"
              className={`duotone absolute h-[280px] w-[220px] object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                hover === idx ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
