import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GenerateCode } from "@/components/generate-code";

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <GenerateCode />
      <Footer />
    </main>
  );
}
