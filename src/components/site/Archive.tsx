import { useEffect, useRef } from "react";
import { ARCHIVE } from "@/lib/site-data";

export function Archive() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const imgs = Array.from(el.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      imgs.forEach((img) => {
        const r = img.getBoundingClientRect();
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        const depth = Number(img.dataset["parallax"] ?? 1);
        img.style.transform = `translate3d(0, ${(-progress * 42 * depth).toFixed(2)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="archive" ref={root} className="px-5 py-28 md:px-8 md:py-40">
      <div className="grid grid-cols-12 gap-x-4 gap-y-8 pb-16 md:gap-8 md:pb-28">
        <h2
          data-reveal
          className="display-xl reveal col-span-12 max-w-[12ch] text-[12vw] md:col-span-6 md:text-[4vw]"
        >
          Past work, lasting pride
        </h2>
        <p
          data-reveal
          data-reveal-delay="100"
          className="reveal col-span-12 max-w-[44ch] self-end text-[0.95rem] leading-relaxed md:col-span-5 md:col-start-8"
        >
          Thoughtful design stands the test of time, no matter when or why it was made.
        </p>
      </div>

      {/* Scattered thumbnails, as in the film's archive teaser */}
      <div className="relative mb-24 hidden h-[190px] md:block" aria-hidden>
        <img
          src={ARCHIVE[4].src}
          alt=""
          loading="lazy"
          data-reveal
          className="duotone reveal absolute top-2 left-[16%] w-[150px] -rotate-3 object-cover shadow-xl"
        />
        <img
          src={ARCHIVE[1].src}
          alt=""
          loading="lazy"
          data-reveal
          data-reveal-delay="140"
          className="duotone reveal absolute top-10 left-[46%] w-[120px] rotate-2 object-cover shadow-xl"
        />
        <img
          src={ARCHIVE[3].src}
          alt=""
          loading="lazy"
          data-reveal
          data-reveal-delay="260"
          className="duotone reveal absolute top-0 right-[10%] w-[165px] rotate-[4deg] object-cover shadow-xl"
        />
        <a
          href="#archive"
          data-reveal
          data-reveal-delay="320"
          className="reveal mono-label absolute bottom-0 left-0 inline-flex items-center gap-2 transition-opacity hover:opacity-60"
        >
          Explore the Archive
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-current text-[8px] leading-none">
            +
          </span>
        </a>
      </div>

      <div className="space-y-24 md:space-y-40">
        {ARCHIVE.map((a, i) => (
          <article
            key={a.name}
            className={`grid items-center gap-8 md:grid-cols-12 ${
              i % 2 ? "md:[direction:rtl]" : ""
            }`}
          >
            <figure
              data-reveal
              className={`reveal md:col-span-5 ${i % 2 ? "md:col-start-1" : "md:col-start-2"}`}
            >
              <img
                data-parallax={i % 2 ? "1.4" : "0.9"}
                src={a.src}
                alt={`${a.name} archive project`}
                loading="lazy"
                className="duotone w-full object-cover will-change-transform hover:[filter:grayscale(0)]"
              />
            </figure>
            <div
              data-reveal
              data-reveal-delay="120"
              className="reveal [direction:ltr] md:col-span-4 md:col-start-8"
            >
              <p className="mono-label opacity-60">
                {String(i + 1).padStart(2, "0")} / {ARCHIVE.length}
              </p>
              <h3 className="display-xl mt-3 text-[7vw] md:text-[1.9vw]">{a.name}</h3>
              <p className="mt-4 max-w-[46ch] text-[0.9rem] leading-relaxed opacity-80">{a.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
