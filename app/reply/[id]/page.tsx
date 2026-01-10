
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReplyConversation } from "@/components/reply-conversation";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export default async function ReplyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Validate UUID format to prevent SQL errors if invalid ID passed
    // Simple regex or let DB throw/handle empty result

    let item = null;

    try {
        const items = await db`
        SELECT id, name, founder_message, location, user_message
        FROM items
        WHERE id = ${id}
      `;
        if (items.length > 0) {
            item = items[0];
        }
    } catch (e) {
        console.error(e);
        return notFound();
    }

    if (!item) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />
            <ReplyConversation
                itemId={item.id}
                itemName={item.name}
                finderMessage={item.founder_message}
                location={item.location}
                previousReply={item.user_message}
            />
            <Footer />
        </main>
    );
}
