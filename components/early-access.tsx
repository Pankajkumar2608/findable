import { Zap } from "lucide-react";

export function EarlyAccess() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Zap className="h-6 w-6 text-foreground" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4 text-balance">
            Currently in Early Access
          </h3>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl mx-auto">
            We are rolling out gradually to ensure quality. Join now to secure
            your spot and help shape the future of lost item recovery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700 border border-green-200">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Digital codes available
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700 border border-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Physical tags coming soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
