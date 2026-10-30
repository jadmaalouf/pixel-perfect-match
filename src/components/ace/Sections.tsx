import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import bottle from "@/assets/ace-bottle.png";
import hands from "@/assets/ace-hands.jpg";
import { features, inside, products, toneClass } from "@/data/ace";
import { useReveal } from "./useReveal";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-logo leading-none tracking-wide ${className}`}>ACE</span>;
}

const pill =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5 active:scale-95";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 text-cream mix-blend-difference">
      <Link to="/" aria-label="ACE home"><Logo className="text-3xl" /></Link>
      <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 p-2">
        <span className="h-0.5 w-6 bg-cream" /><span className="h-0.5 w-6 bg-cream" /><span className="h-0.5 w-6 bg-cream" />
      </button>
      {open && (
        <nav className="absolute right-4 top-14 flex flex-col gap-3 rounded-xl bg-cream p-5 text-sm font-bold uppercase text-obsidian mix-blend-normal" onClick={() => setOpen(false)}>
          <a href="#lineup">Lineup</a>
          <a href="#inside">What's inside</a>
          <Link to="/retailers">Get ACE in your store</Link>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-teal px-5 pb-10 pt-20 text-cream">
      <h1 className="sr-only">ACE Sriracha Chili — 3 new flavours</h1>
      <p className="font-condensed text-5xl font-medium uppercase tracking-tight md:text-7xl">Three</p>
      <div className="relative mt-4 h-[52svh] w-full max-w-md md:h-[60svh]">
        <img src={bottle} alt="" className="anim-float-a absolute bottom-[4%] left-[2%] h-[78%] origin-bottom drop-shadow-2xl" />
        <img src={bottle} alt="" className="anim-float-c absolute bottom-[4%] right-[2%] h-[78%] origin-bottom drop-shadow-2xl" />
        <img src={bottle} alt="ACE Sriracha Chili bottle" className="anim-float-b absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2 drop-shadow-2xl" style={{ translate: "-50% 0" }} />
      </div>
      <div className="mt-6 text-center">
        <p className="font-serif text-6xl italic leading-[0.8] md:text-8xl">new</p>
        <p className="font-condensed text-5xl font-medium uppercase tracking-tight md:text-7xl">Flavours</p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/retailers" className={`${pill} bg-tomato text-cream`}>Get ACE in your store</Link>
        <a href="#lineup" className={`${pill} border border-cream text-cream`}>Find your flavor</a>
      </div>
    </section>
  );
}

export function Lineup() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const scrollBy = (d: number) => scroller.current?.scrollBy({ left: d * scroller.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="lineup" className="bg-mint py-16 text-obsidian">
      <Reveal className="flex items-end justify-between px-5">
        <h2 className="font-serif text-5xl italic leading-none md:text-7xl">Meet the ACE lineup</h2>
        <div className="hidden gap-2 md:flex">
          <button aria-label="Previous" onClick={() => scrollBy(-1)} className="h-11 w-11 rounded-full border border-obsidian text-xl">←</button>
          <button aria-label="Next" onClick={() => scrollBy(1)} className="h-11 w-11 rounded-full border border-obsidian text-xl">→</button>
        </div>
      </Reveal>
      <div ref={scroller} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {products.map((p) => (
          <article key={p.id} className={`${toneClass[p.tone]} flex w-[78%] shrink-0 snap-center flex-col p-5 md:w-[380px]`}>
            <p className="font-condensed text-sm font-bold uppercase">
              {p.name.replace("ACE ", "")} <span className="font-serif font-normal normal-case italic">{p.tag}</span>
            </p>
            <div className="flex h-[360px] items-center justify-center">
              <img src={bottle} alt={p.name} loading="lazy" className="h-[90%] drop-shadow-xl transition-transform duration-500 hover:-rotate-3 hover:scale-105" />
            </div>
            <p className="mx-auto max-w-[24ch] text-center text-sm">{p.description}</p>
            <button onClick={() => setActive(active === p.id ? null : p.id)} className={`${pill} mx-auto mt-5 border border-current`}>
              {active === p.id ? "Close" : "Discover the sauce"}
            </button>
            {active === p.id && (
              <p className="mt-4 text-center text-xs opacity-80">
                {p.tag === "Original" ? "360g squeeze bottle. Full flavour details coming soon." : "Details for this flavour are on the way."}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="relative overflow-hidden bg-burgundy px-5 py-28 text-center text-cream">
      <Reveal>
        <p className="font-serif text-6xl italic leading-[0.9] md:text-8xl">Bring the heat.</p>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-2 font-condensed text-6xl font-bold uppercase leading-[0.9] tracking-tight text-tomato md:text-9xl">Own the taste.</p>
      </Reveal>
    </section>
  );
}

export function Features() {
  return (
    <section className="relative">
      {features.map((f, i) => (
        <div key={f.n} className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden" style={{ zIndex: i + 1 }}>
          <img src={hands} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <Reveal className={`${toneClass[f.tone]} relative flex flex-col items-center px-6 pb-4 pt-6 shadow-2xl ${i % 2 ? "rotate-3" : "-rotate-3"}`}>
            <span className="self-start text-xs font-bold">{f.n}</span>
            <span className="font-condensed text-[7rem] font-bold leading-[0.85] tracking-tighter md:text-[11rem]">{f.big}</span>
            <span className="mt-2 font-condensed text-sm font-bold uppercase">{f.small}</span>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

export function Photo() {
  const [y, setY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r) setY(Math.max(-1, Math.min(1, r.top / window.innerHeight)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section ref={ref} className="relative flex h-[90svh] items-center justify-center overflow-hidden bg-chili">
      <span className="absolute font-logo text-[55vw] leading-none text-tomato/40 md:text-[30vw]" style={{ transform: `translateX(${y * 60}px)` }}>ACE</span>
      <img src={bottle} alt="" loading="lazy" className="absolute left-[8%] h-[45%] -rotate-12 drop-shadow-2xl" style={{ transform: `translateY(${y * 120}px) rotate(-12deg)` }} />
      <img src={bottle} alt="ACE Sriracha Chili" loading="lazy" className="relative z-10 h-[70%] drop-shadow-2xl" style={{ transform: `translateY(${y * 40}px)` }} />
      <img src={bottle} alt="" loading="lazy" className="absolute right-[8%] h-[45%] drop-shadow-2xl" style={{ transform: `translateY(${y * -90}px) rotate(12deg)` }} />
    </section>
  );
}

export function Inside() {
  return (
    <section id="inside" className="bg-teal px-5 py-20 text-cream">
      <Reveal>
        <h2 className="font-serif text-5xl italic md:text-7xl">What's inside?</h2>
        <p className="mt-4 max-w-md text-sm opacity-90">
          Discover the character behind ACE. Explore the flavours and ingredients that make our sauces distinctive.
        </p>
      </Reveal>
      <ul className="mt-10 border-t border-cream/30">
        {inside.map((row, i) => (
          <Reveal key={row.n} delay={i * 80}>
            <li className="flex items-center gap-4 border-b border-cream/30 py-4">
              <span className="text-xs font-bold">{row.n}</span>
              <span className="flex-1 font-condensed text-lg font-bold uppercase">{row.name}</span>
              <span className="h-2 w-2 rounded-full bg-tomato" />
              <span className="font-serif text-lg italic">{row.note}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-obsidian px-5 py-16 text-cream">
      <Logo className="text-8xl" />
      <Link to="/retailers" className={`${pill} bg-tomato text-cream`}>Get ACE in your store</Link>
      <p className="text-xs opacity-60">© {new Date().getFullYear()} ACE Food</p>
    </footer>
  );
}
