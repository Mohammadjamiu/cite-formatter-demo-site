import { useEffect, useMemo, useState } from "react";
import { compileCitations, type Citation } from "cite-formatter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exampleCitations, exampleManuscript, formatOptions } from "@/lib/examples";

type MissingPolicy = "keep" | "remove" | "throw";
type Status =
  | { kind: "idle" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

const DEBOUNCE_MS = 200;

export function Demo(): React.JSX.Element {
  const [manuscript, setManuscript] = useState<string>(exampleManuscript);
  const [citationsText, setCitationsText] = useState<string>(
    JSON.stringify(exampleCitations, null, 2)
  );
  const [format, setFormat] = useState<string>("apa");
  const [throwOnMissing, setThrowOnMissing] = useState<boolean>(false);

  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let citations: Citation[];
      try {
        const parsed: unknown = JSON.parse(citationsText);
        if (!Array.isArray(parsed)) {
          throw new Error("Citations must be a JSON array");
        }
        citations = parsed as Citation[];
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Invalid JSON";
        setOutput("");
        setStatus({ kind: "err", message: `Citations JSON: ${msg}` });
        return;
      }

      const onMissing: MissingPolicy = throwOnMissing ? "throw" : "keep";

      try {
        const result = compileCitations({
          content: manuscript,
          citations,
          format,
          onMissing,
        });
        const parts: string[] = [result.content];
        if (result.references.length > 0) {
          parts.push("", "---", "References", "", result.references.join("\n\n"));
        }
        setOutput(parts.join("\n"));
        if (result.missingIds.length > 0) {
          setStatus({
            kind: "err",
            message: `${result.missingIds.length} unresolved: ${result.missingIds.join(", ")}`,
          });
        } else {
          const used = result.usedIds.size;
          const refCount = result.references.length;
          setStatus({
            kind: "ok",
            message: `${used}/${citations.length} used · ${refCount} reference${refCount === 1 ? "" : "s"}`,
          });
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setOutput("");
        setStatus({ kind: "err", message: msg });
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [manuscript, citationsText, format, throwOnMissing]);

  const onLoadExample = (): void => {
    setManuscript(exampleManuscript);
    setCitationsText(JSON.stringify(exampleCitations, null, 2));
  };

  const onClear = (): void => {
    setManuscript("");
    setCitationsText("[]");
  };

  const statusVariant = useMemo<
    "muted" | "success" | "destructive"
  >(() => {
    if (status.kind === "ok") return "success";
    if (status.kind === "err") return "destructive";
    return "muted";
  }, [status]);

  return (
    <section id="demo" className="bg-secondary/40 hairline-border-t hairline-border-b py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl md:text-[44px]">
            Try it right now.
          </h2>
          <p className="mt-4 text-pretty text-[17px] text-muted-foreground">
            Edit the manuscript and the citation list. The compiled output
            updates as you type. This page is consuming the real{" "}
            <code className="font-mono text-[0.9em] rounded-md bg-background px-1.5 py-0.5 text-foreground">
              cite-formatter
            </code>{" "}
            package from npm — no mocks.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-black/[0.06] bg-secondary/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Format
              </span>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="h-8 w-[140px] text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <label className="ml-auto flex items-center gap-2 text-[13px] text-muted-foreground cursor-pointer select-none">
              <Checkbox
                checked={throwOnMissing}
                onCheckedChange={(v) => setThrowOnMissing(v === true)}
                id="throw-toggle"
              />
              <span>
                Throw on missing{" "}
                <code className="font-mono text-[11px] rounded bg-background px-1 py-0.5 text-foreground">
                  [CITE:id]
                </code>
              </span>
            </label>

            <Button variant="outline" size="sm" onClick={onLoadExample} className="h-8">
              Load example
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear} className="h-8">
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col hairline-border-b md:hairline-border-b-0 md:border-r md:border-black/[0.06]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] bg-secondary/30">
                <span className="text-[12px] font-semibold tracking-wide text-foreground">
                  Manuscript
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Markdown with{" "}
                  <code className="font-mono text-[10.5px] rounded bg-background px-1 py-px">
                    [CITE:id]
                  </code>{" "}
                  placeholders
                </span>
              </div>
              <textarea
                value={manuscript}
                onChange={(e) => setManuscript(e.target.value)}
                spellCheck={false}
                aria-label="Manuscript input"
                className="scrollbar-thin block min-h-[220px] w-full resize-y bg-background p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none transition-shadow duration-250 focus:bg-secondary/20"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] bg-secondary/30">
                <span className="text-[12px] font-semibold tracking-wide text-foreground">
                  Citations
                </span>
                <span className="text-[11px] text-muted-foreground">
                  JSON array of{" "}
                  <code className="font-mono text-[10.5px] rounded bg-background px-1 py-px">
                    Citation
                  </code>{" "}
                  objects
                </span>
              </div>
              <textarea
                value={citationsText}
                onChange={(e) => setCitationsText(e.target.value)}
                spellCheck={false}
                aria-label="Citations JSON input"
                className="scrollbar-thin block min-h-[220px] w-full resize-y bg-background p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none transition-shadow duration-250 focus:bg-secondary/20"
              />
            </div>
          </div>

          <div className="hairline-border-t bg-secondary/20">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06]">
              <span className="text-[12px] font-semibold tracking-wide text-foreground">
                Compiled output
              </span>
              <Badge
                variant={statusVariant}
                aria-live="polite"
                className="font-mono text-[11px]"
              >
                {status.kind === "idle" ? "ready" : status.message}
              </Badge>
            </div>
            <pre
              aria-label="Compiled citation output"
              className="scrollbar-thin m-0 block max-h-[420px] min-h-[140px] w-full overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed text-foreground"
            >
              {output || (
                <span className="text-muted-foreground/60">
                  Start typing in the manuscript or citations panel…
                </span>
              )}
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
}
