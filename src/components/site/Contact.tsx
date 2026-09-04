const MARQUEE = "Let's make something that lasts —  ";

export function Contact() {
  return (
    <footer id="contact" className="theme-cream overflow-hidden pt-28 md:pt-40">
      <div className="px-5 md:px-8">
        <p data-reveal className="mono-label reveal opacity-70">
          Contact
        </p>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="display-xl reveal mt-6 max-w-[16ch] text-[12vw] md:text-[5.4vw]"
        >
          Let&rsquo;s build something with purpose
        </h2>

        <div className="mt-14 grid gap-10 pb-20 md:grid-cols-12 md:gap-8 md:pb-28">
          <div className="md:col-span-4">
            <p className="mono-label opacity-60">Email</p>
            <a
              href="mailto:michael@punchmarkstudio.com"
              className="mt-2 inline-block text-[1.05rem] underline-offset-4 transition-opacity hover:opacity-60 md:text-[1.25rem]"
            >
              michael@punchmarkstudio.com
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="mono-label opacity-60">Based in</p>
            <p className="mt-2 text-[1.05rem] md:text-[1.25rem]">
              Chicago + Naperville
              <br />
              Working worldwide
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="mono-label opacity-60">Elsewhere</p>
            <ul className="mt-2 space-y-1 text-[1.05rem] md:text-[1.25rem]">
              <li>
                <a href="#" className="transition-opacity hover:opacity-60">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="transition-opacity hover:opacity-60">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hairline overflow-hidden py-6">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="display-tight whitespace-pre pr-4 text-[8vw] md:text-[5vw]">
              {MARQUEE.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <div className="hairline mono-label flex flex-wrap items-center justify-between gap-3 px-5 py-6 opacity-70 md:px-8">
        <span>&copy; {new Date().getFullYear()} Michael Brown</span>
        <span>Creative &amp; Design Director</span>
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
