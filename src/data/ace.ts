// Editable ACE content. Replace placeholder copy here as real product info arrives.
export type Tone = "chili" | "cream" | "teal";

export const products: {
  id: string;
  name: string;
  tag: string;
  description: string;
  tone: Tone;
}[] = [
  {
    id: "original",
    name: "ACE Original Sriracha Chili",
    tag: "Original",
    description:
      "A bold and flavourful chili sauce that brings character, colour and excitement to everyday meals.",
    tone: "chili",
  },
  {
    id: "flavour-02",
    name: "ACE Flavour 02",
    tag: "Coming soon",
    description:
      "Discover another expression of the ACE collection, bringing a new personality to your everyday food experience.",
    tone: "cream",
  },
  {
    id: "flavour-03",
    name: "ACE Flavour 03",
    tag: "Coming soon",
    description:
      "A different side of the ACE collection, created for those who appreciate bold sauces and memorable flavours.",
    tone: "teal",
  },
];

export const features = [
  { n: "01", big: "BOLD", small: "Flavour", tone: "chili" as Tone },
  { n: "02", big: "CHILI", small: "Character", tone: "cream" as Tone },
  { n: "03", big: "DAILY", small: "Made for everyday meals", tone: "teal" as Tone },
];

// Placeholder rows until the real ingredient list is supplied.
export const inside = [
  { n: "01", name: "Ingredient one", note: "To be added" },
  { n: "02", name: "Ingredient two", note: "To be added" },
  { n: "03", name: "Ingredient three", note: "To be added" },
  { n: "04", name: "Ingredient four", note: "To be added" },
  { n: "05", name: "Ingredient five", note: "To be added" },
];

export const toneClass: Record<Tone, string> = {
  chili: "bg-chili text-cream",
  cream: "bg-cream text-obsidian",
  teal: "bg-teal-deep text-cream",
};
