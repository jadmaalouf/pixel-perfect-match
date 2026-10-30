import { createFileRoute } from "@tanstack/react-router";
import { Features, Footer, Header, Hero, Inside, Lineup, Photo, Statement } from "@/components/ace/Sections";
import { Reviews } from "@/components/ace/Reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACE — Sriracha Chili Sauce | New Flavours" },
      { name: "description", content: "ACE Sriracha Chili. Bring the heat, own the taste. Meet the ACE lineup." },
      { property: "og:title", content: "ACE — Sriracha Chili Sauce" },
      { property: "og:description", content: "Bring the heat. Own the taste. Meet the ACE lineup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <Lineup />
      <Statement />
      <Features />
      <Photo />
      <Inside />
      <Reviews />
      <Footer />
    </main>
  );
}
