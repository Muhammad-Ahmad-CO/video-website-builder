import { PORTRAIT } from "@/lib/site-data";

export function About() {
  return (
    <section id="about" className="px-5 py-28 md:px-8 md:py-44">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <h2
          data-reveal
          className="display-xl reveal col-span-12 max-w-[14ch] text-[10vw] md:col-span-6 md:text-[3.6vw]"
        >
          Understated by choice, purposeful by design
        </h2>

        <div
          data-reveal
          data-reveal-delay="120"
          className="reveal col-span-12 space-y-6 text-[0.95rem] leading-relaxed md:col-span-5 md:col-start-8 md:text-[1rem]"
        >
          <p>
            I approach challenges with intention&mdash;balancing bold ideas with subtle details and
            bringing clarity and care to every project. Whether collaborating with teams or
            individuals, I focus on uncovering opportunities, refining solutions, and delivering
            work that&rsquo;s as human as it is polished.
          </p>
          <p>
            The best ideas&mdash;and people&mdash;don&rsquo;t need to shout. They listen, connect,
            and leave their mark.
          </p>
        </div>
      </div>

      <figure data-reveal className="reveal mt-24 grid gap-6 md:mt-40 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-2">
          <img
            src={PORTRAIT}
            alt="Michael Brown, creative and design director, wearing a button-down shirt"
            loading="lazy"
            className="duotone aspect-[4/5] w-full object-cover"
          />
        </div>
        <figcaption className="mono-label self-end opacity-70 md:col-span-4 md:col-start-8">
          Michael Brown &mdash; Creative &amp; Design Director
          <br />
          Chicago + Naperville
        </figcaption>
      </figure>
    </section>
  );
}
