import {
  Library,
  ListOrdered,
  Wrench,
  Parentheses,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features: ReadonlyArray<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}> = [
  {
    icon: Library,
    title: "6 built-in styles",
    description:
      "APA 7, IEEE, Chicago, MLA 9, Vancouver, and Harvard — each implemented from the official style guides, not a regex pass.",
  },
  {
    icon: ListOrdered,
    title: "Numbered formats keep state",
    description:
      "IEEE and Vancouver auto-number your citations in order of first appearance. Reorder paragraphs; the numbers follow.",
  },
  {
    icon: Wrench,
    title: "Register your own",
    description:
      "Need a house style? registerFormat() takes a name, a detector, and a renderer. The rest of the API stays the same.",
  },
  {
    icon: Parentheses,
    title: "Grouping & modifiers",
    description:
      "Chain adjacent [CITE:id] tags into one parenthetical; add |p=12 or |narrative per tag. APA, Chicago, and Harvard add 2020a/2020b when the same author-year appears twice.",
  },
  {
    icon: ShieldCheck,
    title: "Strict on missing",
    description:
      "Set onMissing to throw in CI to catch dangling [CITE:id] references before they ship.",
  },
  {
    icon: Sparkles,
    title: "Zero runtime deps",
    description:
      "Bundles cleanly into browser apps, Node CLIs, and serverless functions. TypeScript types ship in the box.",
  },
];

export function Features(): React.JSX.Element {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl md:text-[44px]">
            Built for the way you actually write.
          </h2>
          <p className="mt-4 text-pretty text-[17px] text-muted-foreground">
            Most citation tools are a UI.{" "}
            <code className="font-mono text-[0.9em] rounded-md bg-black/[0.05] px-1.5 py-0.5 text-foreground">
              cite-formatter
            </code>{" "}
            is a library. Use it from the CLI, in a build step, or at runtime in a
            web app.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className="group apple-transition hover:-translate-y-0.5 hover:shadow-apple-md"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-350 ease-spring group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-[17px]">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
