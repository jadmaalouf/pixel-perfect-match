import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/ace/Sections";

export const Route = createFileRoute("/retailers")({
  head: () => ({
    meta: [
      { title: "Stock ACE — Retailer & Distributor Enquiries" },
      { name: "description", content: "Supermarkets, grocers and distributors: get ACE Sriracha Chili in your store." },
      { property: "og:title", content: "Get ACE in your store" },
      { property: "og:description", content: "Retailer and distributor enquiries for ACE Sriracha Chili." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Retailers,
});

function Retailers() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-chili px-6 text-center text-cream">
      <Link to="/"><Logo className="text-7xl" /></Link>
      <h1 className="font-serif text-5xl italic">Get ACE in your store</h1>
      <p className="max-w-md text-sm opacity-90">
        For supermarkets, grocery stores and distributors. Our retailer enquiry form is coming soon — contact details will be added here.
      </p>
      <Link to="/" className="rounded-full border border-cream px-6 py-3 text-xs font-bold uppercase">Back home</Link>
    </main>
  );
}
