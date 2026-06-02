import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Demo } from "@/components/Demo";
import { InstallSection } from "@/components/InstallSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Demo />
        <InstallSection />
      </main>
      <SiteFooter />
    </div>
  );
}
