import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-6 pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground mb-8">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Early access now available
          <ChevronRight className="h-4 w-4" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1.1] text-balance">
          Lost items shouldn't
          <br />
          stay lost
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Attach a unique code to your belongings. If someone finds them, they
          can reach you instantly — no phone number, no app required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base rounded-full gap-2"
          >
            <Link href="/generate">
              Get a Code
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base rounded-full gap-2 bg-transparent"
          >
            <Link href="/found">
              <Search className="h-4 w-4" />
              Found an Item?
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
