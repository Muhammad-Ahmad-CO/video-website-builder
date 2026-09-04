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
      <div className="grid gap-8 pb-16 md:grid-cols-12 md:pb-28">
        <h2
          data-reveal
          className="display-xl reveal col-span-12 text-[12vw] md:col-span-6 md:text-[4vw]"
        >
          Archive
        </h2>
        <p
          data-reveal
          data-reveal-delay="100"
          className="reveal col-span-12 max-w-[44ch] self-end text-[0.95rem] leading-relaxed md:col-span-5 md:col-start-8"
        >
          A selection of earlier work spanning identity, editorial, environments, and product
          design.
        </p>
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
