import { PROJECTS } from "@/lib/site-data";

const THEMES = ["theme-olive", "theme-midnight", "theme-cream"];

export function Projects() {
  return (
    <div>
      {PROJECTS.map((p, i) => (
        <section
          key={p.client}
          className={`${THEMES[i % THEMES.length]} px-5 py-24 md:px-8 md:py-36`}
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <p data-reveal className="mono-label reveal opacity-70">
                {String(i + 1).padStart(2, "0")} &mdash; Featured Project
              </p>
              <h3
                data-reveal
                data-reveal-delay="80"
                className="display-xl reveal mt-5 text-[11vw] md:text-[3.9vw]"
              >
                {p.client}
              </h3>
              <p
                data-reveal
                data-reveal-delay="140"
                className="reveal mt-6 max-w-[34ch] text-[1.05rem] leading-snug md:text-[1.35rem]"
              >
                {p.title}
              </p>

              <ul
                data-reveal
                data-reveal-delay="200"
                className="reveal mono-label mt-10 grid grid-cols-1 gap-x-8 gap-y-2 opacity-75 sm:grid-cols-2"
              >
                {p.services.map((s) => (
                  <li key={s} className="hairline pt-2">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <figure
              data-reveal
              data-reveal-delay="120"
              className="reveal md:col-span-5 md:col-start-8"
            >
              <img
                src={p.image}
                alt={`${p.client} project imagery`}
                loading="lazy"
                className="duotone aspect-[4/5] w-full object-cover hover:[filter:grayscale(0)]"
              />
            </figure>
          </div>
        </section>
      ))}
    </div>
  );
}
