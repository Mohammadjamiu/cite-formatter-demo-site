import { Copy, Check } from "lucide-react";
import { useState } from "react";

const INSTALL = "npm install cite-formatter";

const USAGE = `import { compileCitations } from "cite-formatter";
import { readFile } from "node:fs/promises";

const manuscript = await readFile("chapter.md", "utf8");
const citations = JSON.parse(await readFile("refs.json", "utf8"));

const { content, references, missingIds } = compileCitations({
  content: manuscript,
  citations,
  format: "apa",
  onMissing: "throw",
});

console.log(content);
console.log("\\nReferences:\\n" + references.join("\\n\\n"));`;

const CLI = `npx cite-formatter --format apa --in chapter.md --refs refs.json --out chapter.cited.md`;

function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="group relative overflow-hidden rounded-xl border border-black/[0.08] bg-[#0f172a] shadow-apple-md">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-inset ring-black/[0.08]"
          />
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-inset ring-black/[0.08]"
          />
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-inset ring-black/[0.08]"
          />
          <span className="ml-3 text-[11px] font-medium uppercase tracking-wider text-white/40">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-white/60 transition-colors duration-250 hover:bg-white/[0.06] hover:text-white/90"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function InstallSection(): React.JSX.Element {
  return (
    <section id="install" className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl md:text-[44px]">
            Install and use.
          </h2>
          <p className="mt-4 text-pretty text-[17px] text-muted-foreground">
            Two minutes from <code className="font-mono text-[0.9em] rounded-md bg-secondary px-1.5 py-0.5 text-foreground">npm install</code> to your first citation.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-5">
          <CodeBlock code={INSTALL} language="terminal" />
          <CodeBlock code={USAGE} language="typescript" />
          <CodeBlock code={CLI} language="terminal" />
        </div>
      </div>
    </section>
  );
}
