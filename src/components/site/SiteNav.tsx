import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Archive", id: "archive" },
  { label: "Contact", id: "contact" },
];

export function SiteNav() {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Michael Brown — home"
          className="flex items-center gap-1"
        >
          <span className="display-tight text-[1.15rem] leading-none">M</span>
          <span className="mt-[2px] block h-[0.62rem] w-[0.62rem] bg-current" />
        </button>

        <ul className="hidden items-center gap-14 md:flex lg:gap-24">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="mono-label relative py-1 transition-opacity duration-300 hover:opacity-60"
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mono-label md:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="bg-[var(--theme-base)] px-5 pb-8 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="display-xl text-4xl">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mono-label hairline mt-8 space-y-2 pt-4 opacity-70">
            <p>michael@punchmarkstudio.com</p>
            <p>Schedule a call</p>
          </div>
        </div>
      )}
    </header>
  );
}
