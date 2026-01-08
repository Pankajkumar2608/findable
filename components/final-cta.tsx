import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-balance">
            Ready to protect your belongings?
          </h2>
          <p className="mt-6 text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Create your first code in seconds. It's free during early access.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-10 h-14 px-8 text-base rounded-full gap-2"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
