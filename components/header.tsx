"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRouter } from 'next/navigation';

export function Header() {
  const route = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          findable
        </Link>
        <Button onClick={()=>route.push("/getCode")} className="rounded-full px-6">Get Your Code</Button>
      </div>
    </header>
  );
}
