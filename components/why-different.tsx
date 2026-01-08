import { ShieldCheck, Smartphone, Lock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "No phone number shared",
    description:
      "Your personal contact stays private. Communicate without revealing your identity.",
  },
  {
    icon: Smartphone,
    title: "No app required",
    description:
      "The finder just enters the code in any browser. Nothing to download.",
  },
  {
    icon: Lock,
    title: "Privacy-first chat",
    description:
      "Abuse-safe messaging with controls. You decide when to share more.",
  },
];

export function WhyDifferent() {
  return (
    <section className="px-6 py-24 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
              Privacy that puts you first
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md">
              We built this because existing solutions ask for too much. Here,
              you stay anonymous until you choose otherwise.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <feature.icon
                      className="h-5 w-5 text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
