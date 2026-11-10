import { PROJECTS } from "@/lib/site-data";

/*
 * Featured projects as the film shows them: full-viewport black-and-white
 * photographs with the client and headline at the left, the deliverables
 * list in the middle, and VIEW PROJECT at the right.
 */
export function Projects() {
  return (
    <div>
      {PROJECTS.map((p, i) => (
        <section key={p.client} className="relative flex min-h-[100svh] items-center overflow-hidden">
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className="duotone absolute inset-0 h-full w-full scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />

          <div className="relative z-10 grid w-full gap-10 px-5 py-24 text-[#f6e4d6] md:grid-cols-12 md:gap-8 md:px-8">
            <div className="md:col-span-5">
              <p data-reveal className="mono-label reveal opacity-80">
                {p.client}
              </p>
              <h3
                data-reveal
                data-reveal-delay="80"
                className="display-xl reveal mt-4 max-w-[16ch] text-[9vw] leading-[1.02] md:text-[2.9vw]"
              >
                {p.title}
              </h3>
            </div>

            <ul
              data-reveal
              data-reveal-delay="160"
              className="reveal mono-label space-y-1.5 self-center opacity-90 md:col-span-4"
            >
              {p.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div data-reveal data-reveal-delay="220" className="reveal md:col-span-3">
              <a
                href="#archive"
                className="mono-label group inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                View Project
                <span className="inline-flex h-4 w-4 items-center justify-center border border-current text-[9px] leading-none transition-transform duration-300 group-hover:rotate-45">
                  +
                </span>
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
