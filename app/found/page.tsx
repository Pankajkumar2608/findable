import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FoundItem } from "@/components/found-item";

export default function FoundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FoundItem />
      <Footer />
    </main>
  );
}
