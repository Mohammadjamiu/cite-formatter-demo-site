export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="hairline-border-t bg-secondary/30">
      <div className="container flex flex-col items-center justify-between gap-3 py-7 text-[13px] text-muted-foreground sm:flex-row">
        <p>
          MIT &middot; by{" "}
          <a
            href="https://github.com/Mohammadjamiu"
            target="_blank"
            rel="noopener"
            className="text-foreground transition-colors duration-250 hover:text-primary"
          >
            Mohammad-Jamiu Balogun
          </a>
        </p>
        <p className="flex items-center gap-4">
          <a
            href="https://github.com/Mohammadjamiu/cite-formatter"
            target="_blank"
            rel="noopener"
            className="transition-colors duration-250 hover:text-foreground"
          >
            Source
          </a>
          <span aria-hidden="true" className="text-black/20">·</span>
          <a
            href="https://www.npmjs.com/package/cite-formatter"
            target="_blank"
            rel="noopener"
            className="transition-colors duration-250 hover:text-foreground"
          >
            Package
          </a>
          <span aria-hidden="true" className="text-black/20">·</span>
          <a
            href="https://github.com/Mohammadjamiu/cite-formatter/issues"
            target="_blank"
            rel="noopener"
            className="transition-colors duration-250 hover:text-foreground"
          >
            Issues
          </a>
        </p>
      </div>
    </footer>
  );
}
