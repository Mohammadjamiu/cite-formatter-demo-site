import { useEffect, useState } from "react";
import { Github, Menu, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const GITHUB_URL = "https://github.com/Mohammadjamiu/cite-formatter";
const NPM_URL = "https://www.npmjs.com/package/cite-formatter";

const NAV_ITEMS: Array<{ href: string; label: string; external?: boolean }> = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Live demo" },
  { href: "#install", label: "Install" },
  { href: GITHUB_URL, label: "GitHub", external: true },
];

export function SiteHeader(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-colors duration-300 supports-[backdrop-filter]:backdrop-blur-xl",
        scrolled
          ? "bg-background/80 border-black/[0.06]"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label="cite-formatter home"
          className="flex items-center gap-2.5 group"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-[12px] font-bold font-mono shadow-apple-xs"
          >
            [C]
          </span>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
            cite-formatter
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-[13.5px] font-medium"
        >
          <a
            href="#features"
            className="text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#demo"
            className="text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            Live demo
          </a>
          <a
            href="#install"
            className="text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            Install
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <Button asChild size="sm" className="rounded-full px-4 h-8">
            <a href={NPM_URL} target="_blank" rel="noopener">
              npm
            </a>
          </Button>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full h-8 px-3"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              aria-label="Star cite-formatter on GitHub"
            >
              <Star className="fill-current" />
              <span>Star</span>
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-full px-4 h-8">
            <a href={NPM_URL} target="_blank" rel="noopener">
              npm
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-foreground hover:bg-muted active:bg-muted/70 transition-colors duration-250"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        data-state={mobileOpen ? "open" : "closed"}
        className="md:hidden grid grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-apple"
      >
        <div className="overflow-hidden">
          <div className="bg-background border-t border-black/[0.06]">
            <nav
              aria-label="Primary mobile"
              className="container py-2 flex flex-col"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-[15px] font-medium text-foreground hover:bg-muted transition-colors duration-250"
                >
                  {item.external ? (
                    <Github className="h-4 w-4 text-muted-foreground" />
                  ) : null}
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
