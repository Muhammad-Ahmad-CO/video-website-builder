import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { About } from "@/components/site/About";
import { Clients } from "@/components/site/Clients";
import { Projects } from "@/components/site/Projects";
import { Archive } from "@/components/site/Archive";
import { Contact } from "@/components/site/Contact";
import { useReveal, useSmoothScroll } from "@/components/site/use-reveal";

const TITLE = "Muhammad Ahmad — Creative & Design Director";
const DESCRIPTION =
  "Portfolio of Muhammad Ahmad, creative and design director in Chicago working on brand identity, editorial, packaging and digital experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  useSmoothScroll();

  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <Statement />
      <About />
      <Clients />
      <Projects />
      <Archive />
      <Contact />
    </main>
  );
}
