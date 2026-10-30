import { useEffect, useState } from "react";
import { z } from "zod";

type Review = { name: string; city?: string; text: string; stars: number; tag: [string, string] };

const seed: Review[] = [
  { name: "Marcus", city: "Beirut", text: "Finally a chili sauce that actually tastes like chili.", stars: 5, tag: ["ORIGINAL", "sriracha"] },
  { name: "Priya", city: "Dubai", text: "The heat hits just right. Bought three bottles.", stars: 5, tag: ["ORIGINAL", "sriracha"] },
  { name: "Jordan", text: "Goes on everything. Eggs, burgers, noodles.", stars: 5, tag: ["BOLD", "chili"] },
  { name: "Maya R.", city: "Jounieh", text: "Our whole family fights over the last squeeze.", stars: 4, tag: ["DAILY", "heat"] },
  { name: "Jen K.", city: "Paris", text: "Bold, clean finish. No weird aftertaste.", stars: 5, tag: ["ORIGINAL", "sriracha"] },
];

// cream cards with alternating accents
const tones = [
  { card: "bg-cream text-burgundy", bar: "bg-tomato text-cream" },
  { card: "bg-tomato text-cream", bar: "bg-cream text-burgundy" },
  { card: "bg-cream text-obsidian", bar: "bg-obsidian text-cream" },
  { card: "bg-obsidian text-cream", bar: "bg-cream text-obsidian" },
];
const tilts = [-4, 3, -2, 4, -3];

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(40),
  city: z.string().trim().max(40).optional(),
  text: z.string().trim().min(3, "Please write a comment").max(160),
  stars: z.number().int().min(1, "Tap a star to rate").max(5),
});

const KEY = "ace-reviews";

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <p className={`text-xl tracking-widest ${className}`} aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="opacity-25">{"★".repeat(5 - n)}</span>
    </p>
  );
}

function Card({ r, i }: { r: Review; i: number }) {
  const t = tones[i % tones.length];
  return (
    <article
      className={`flex h-[420px] w-[270px] shrink-0 flex-col shadow-2xl ${t.card}`}
      style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
    >
      <p className={`py-1.5 text-center font-condensed text-sm font-bold ${t.bar}`}>
        {r.tag[0]} <span className="font-serif font-normal italic">{r.tag[1]}</span>
      </p>
      <div className="flex flex-1 flex-col justify-end gap-4 px-5 pb-6 text-center">
        <Stars n={r.stars} className="mx-auto" />
        <p className="font-condensed text-lg font-bold uppercase leading-tight">“{r.text}”</p>
      </div>
      <p className={`px-3 py-1.5 font-serif text-sm italic ${t.bar}`}>
        {r.name}
        {r.city ? `  ·  ${r.city}` : ""}
      </p>
    </article>
  );
}

export function Reviews() {
  const [list, setList] = useState<Review[]>(seed);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]") as Review[];
      if (saved.length) setList([...saved, ...seed]);
    } catch {
      /* ignore */
    }
  }, []);

  const add = (r: Review) => {
    const saved = list.filter((x) => !seed.includes(x));
    localStorage.setItem(KEY, JSON.stringify([r, ...saved].slice(0, 30)));
    setList([r, ...list]);
  };

  const loop = [...list, ...list];

  return (
    <section id="reviews" className="overflow-hidden bg-burgundy py-20 text-cream">
      <div className="flex items-start justify-between gap-4 px-5">
        <h2 className="font-serif text-5xl italic leading-none md:text-7xl">People are talking</h2>
        <button
          onClick={() => setOpen(true)}
          className="relative mt-1 flex shrink-0 items-center gap-2 rounded-full bg-cream px-4 py-2.5 font-condensed text-sm font-bold uppercase text-burgundy shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-tomato" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-tomato" />
          <span className="text-lg leading-none">+</span> Leave a Review
        </button>
      </div>

      <div className="mt-14 flex w-max gap-6 py-6 pl-5 anim-marquee hover:[animation-play-state:paused]">
        {loop.map((r, i) => (
          <Card key={i} r={r} i={i % list.length} />
        ))}
      </div>

      {open && <ReviewForm onClose={() => setOpen(false)} onSubmit={(r) => { add(r); setOpen(false); }} />}
    </section>
  );
}

function ReviewForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Review) => void }) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse({ name, city: city || undefined, text, stars });
    if (!res.success) return setError(res.error.issues[0].message);
    onSubmit({ ...res.data, tag: ["ORIGINAL", "sriracha"] });
  };

  const field = "w-full rounded-lg border border-burgundy/30 bg-transparent px-3 py-2.5 text-obsidian outline-none focus:border-tomato";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/70 p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="anim-rise w-full max-w-sm rounded-2xl bg-cream p-6 text-obsidian shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-3xl italic text-burgundy">Your review</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
        </div>

        <p className="mt-5 text-xs font-bold uppercase">Your rating</p>
        <div className="mt-1 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`${s} star${s > 1 ? "s" : ""}`}
              onClick={() => setStars(s)}
              onMouseEnter={() => setHover(s)}
              className={`text-4xl transition-transform active:scale-125 ${(hover || stars) >= s ? "text-tomato" : "text-burgundy/20"}`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <input className={field} placeholder="Your name" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
          <input className={field} placeholder="City (optional)" value={city} maxLength={40} onChange={(e) => setCity(e.target.value)} />
          <textarea className={`${field} h-24 resize-none`} placeholder="Your comment" value={text} maxLength={160} onChange={(e) => setText(e.target.value)} />
        </div>
        {error && <p className="mt-2 text-sm text-chili">{error}</p>}

        <button type="submit" className="mt-5 w-full rounded-full bg-burgundy py-3 font-condensed font-bold uppercase text-cream">
          Post review
        </button>
      </form>
    </div>
  );
}
