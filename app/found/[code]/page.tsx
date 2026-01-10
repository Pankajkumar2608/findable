
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FoundItem } from "@/components/found-item";

export default async function FoundPage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <FoundItem initialCode={code} />
            <Footer />
        </main>
    );
}
