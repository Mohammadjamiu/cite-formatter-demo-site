import { Copy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const INSTALL_CMD = "npm install cite-formatter";

export function Hero(): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(175 84% 32% / 0.08), transparent 70%)",
        }}
      />
      <div className="container relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3 py-1 text-[12.5px] font-medium text-muted-foreground backdrop-blur-sm shadow-apple-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            v0.1.0
            <span className="text-black/20">·</span>
            zero runtime deps
            <span className="text-black/20">·</span>
            dual ESM / CJS
          </div>

          <h1 className="font-display text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl md:text-[64px] lg:text-[72px]">
            Citations that stay in sync with your manuscript.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted-foreground sm:text-lg md:text-[19px]">
            Drop <code className="font-mono text-[0.9em] rounded-md bg-black/[0.05] px-1.5 py-0.5 text-foreground">[CITE:smith2023]</code> placeholders into your text. Point <code className="font-mono text-[0.9em] rounded-md bg-black/[0.05] px-1.5 py-0.5 text-foreground">cite-formatter</code> at a citation list. Get back a manuscript with every reference rendered in the style you chose — APA, IEEE, Chicago, MLA, Vancouver, or Harvard.
          </p>

          <div className="mt-9 flex justify-center">
            <div className="inline-flex items-stretch overflow-hidden rounded-xl border border-black/[0.08] bg-white/80 shadow-apple-sm backdrop-blur-sm">
              <code className="flex items-center px-5 py-3 font-mono text-[14px] text-foreground">
                $ {INSTALL_CMD}
              </code>
              <button
                type="button"
                onClick={onCopy}
                aria-label="Copy install command"
                className="flex items-center gap-1.5 border-l border-black/[0.06] bg-black/[0.02] px-4 text-[13px] font-medium text-muted-foreground transition-colors duration-250 hover:bg-black/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:bg-black/[0.05]"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6 h-11">
              <a href="#demo">
                Try the live demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 h-11">
              <a
                href="https://github.com/Mohammadjamiu/cite-formatter"
                target="_blank"
                rel="noopener"
              >
                Read the docs
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
