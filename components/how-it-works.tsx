import { QrCode, Tag, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "Get a unique code",
    description:
      "Create a code, QR, or NFC tag linked to your anonymous contact.",
  },
  {
    icon: Tag,
    title: "Stick it on your item",
    description:
      "Attach the code to your bag, wallet, keys, or anything you might lose.",
  },
  {
    icon: MessageCircle,
    title: "Finder chats with you",
    description:
      "If found, they enter the code and start an anonymous chat with you.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <step.icon
                  className="h-5 w-5 text-foreground"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
