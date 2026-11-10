import { useEffect, useRef, useState } from "react";
import { CLIENTS, ARCHIVE } from "@/lib/site-data";

/*
 * The film's ending: a giant condensed headline, contact rows on the
 * right, and project cards that tumble in and pile up at the bottom
 * of the page once the footer scrolls into view.
 */
const FALL_CARDS = [
  { src: CLIENTS[9].src, left: "1%", bottom: 10, rot: -7 },
  { src: CLIENTS[3].src, left: "15%", bottom: 2, rot: 4 },
  { src: CLIENTS[5].src, left: "29%", bottom: 14, rot: -3 },
  { src: ARCHIVE[4].src, left: "44%", bottom: 4, rot: 6 },
  { src: CLIENTS[0].src, left: "58%", bottom: 12, rot: -5 },
  { src: CLIENTS[7].src, left: "72%", bottom: 3, rot: 3 },
  { src: CLIENTS[12].src, left: "85%", bottom: 10, rot: -4 },
];

export function Contact() {
  const footRef = useRef<HTMLElement>(null);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const el = footRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDropped(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDropped(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer id="contact" ref={footRef} className="overflow-hidden pt-28 md:pt-40">
      <div className="px-5 md:px-8">
        <p data-reveal className="mono-label reveal opacity-70">
          Let&rsquo;s start the conversation
        </p>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="display-xl reveal mt-6 text-[11.5vw] leading-[0.98] uppercase md:text-[5.6vw]"
        >
          Great design isn&rsquo;t just about what you make&mdash;it&rsquo;s about who you make it
          with.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 md:col-start-9">
            <p data-reveal className="reveal max-w-[38ch] text-[0.95rem] leading-relaxed">
              I partner with those who value thoughtful, intentional work that speaks with purpose.
              If you&rsquo;re ready to be heard, I&rsquo;m ready to listen.
            </p>
            <div className="mt-8">
              {[
                { label: "github.com/Muhammad-Ahmad-CO", href: "https://github.com/Muhammad-Ahmad-CO" },
                { label: "Schedule a call", href: "#contact" },
              ].map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="hairline group flex items-center justify-between py-4 transition-opacity hover:opacity-70"
                >
                  <span className="mono-label !text-[0.8rem] tracking-[0.08em] uppercase">
                    {row.label}
                  </span>
                  <span className="inline-flex h-4 w-4 items-center justify-center border border-current text-[9px] leading-none transition-transform duration-300 group-hover:rotate-45">
                    +
                  </span>
                </a>
              ))}
              <div className="hairline" />
            </div>
          </div>
        </div>
      </div>

      {/* Falling cards playground */}
      <div className="relative mt-6 h-[300px] md:h-[380px]" aria-hidden>
        {FALL_CARDS.map((c, i) => (
          <img
            key={i}
            src={c.src}
            alt=""
            loading="lazy"
            className="duotone absolute w-[118px] shadow-[0_24px_44px_rgba(0,0,0,0.45)] md:w-[168px]"
            style={{
              left: c.left,
              bottom: c.bottom,
              opacity: dropped ? 1 : 0,
              transform: dropped
                ? `translateY(0) rotate(${c.rot}deg)`
                : `translateY(-72vh) rotate(${c.rot - 16}deg)`,
              transition: `transform 1.15s cubic-bezier(0.3, 1.35, 0.55, 1) ${0.15 + i * 0.14}s, opacity 0.5s ease ${0.15 + i * 0.14}s`,
            }}
          />
        ))}
      </div>

      <div className="hairline mono-label flex flex-wrap items-center justify-between gap-3 px-5 py-6 opacity-70 md:px-8">
        <span className="flex items-center gap-5">
          <span>Terms</span>
          <span>Privacy</span>
          <span className="normal-case tracking-normal">&copy; 2008&mdash;2026 Muhammad Ahmad</span>
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition-opacity hover:opacity-60"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
