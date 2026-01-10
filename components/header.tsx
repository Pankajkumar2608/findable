import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          findable
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-full px-4 gap-2">
            <Link href="/found">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Found Item</span>
            </Link>
          </Button>
          <Button asChild className="rounded-full px-6">
            <Link href="/getCode">Get a Code</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
