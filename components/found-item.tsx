"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Heart,
  MapPin,
  MessageSquare,
  Check,
  Shield,
} from "lucide-react";

export function FoundItem() {
  const [code, setCode] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [item, SetItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [founderEmail, setFounderEmail] = useState("");

  const handleLookup = async() => {
    setLoading(true);
    if (!code.trim()) return;
    const foundItem = fetch(`/api/lookup?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await foundItem;
    const data = await response.json();
    SetItem(data.item);
    setUserMessage(data.message);
    setIsFound(true);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const sendMessage = fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, message, location }),
    });
    sendMessage.then(() => {
      setIsSent(true);
    })
  };

  const handleReset = () => {
    setCode("");
    setIsFound(false);
    setMessage("");
    setLocation("");
    setIsSent(false);
  };

  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent mb-6">
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-foreground">Thank you for helping</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
            {isSent
              ? "Message sent!"
              : isFound
              ? "Item found"
              : "Found something?"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isSent
              ? "The owner has been notified. You're a hero!"
              : isFound
              ? "Great! Let the owner know you found their item."
              : "Enter the code on the item to notify the owner."}
          </p>
        </div>

        {!isFound ? (
          /* Code Entry State */
          <div className="space-y-6">
            {/* Code Input */}
            <div>
              <Input
                type="text"
                placeholder="Enter code (e.g. FND-XXXX-XXXX)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                className="h-14 px-6 text-lg text-center tracking-widest font-mono rounded-2xl border-border bg-card shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Lookup Button */}
            {!loading ? (
              <Button
                onClick={handleLookup}
                disabled={!code.trim()}
                className="w-full h-14 rounded-2xl text-lg font-medium gap-2 disabled:opacity-50"
              >
                Look Up Item
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                disabled
                className="w-full h-14 rounded-2xl text-lg font-medium gap-2 disabled:opacity-50">
                <ArrowRight className="w-4 h-4" />
                <span>Looking up...</span>
              </Button>
            )}

            {/* Where to find code */}
            <div className="bg-secondary/50 rounded-2xl p-6">
              <h3 className="font-medium text-foreground mb-3 text-sm">
                Where's the code?
              </h3>
              <p className="text-sm text-muted-foreground">
                Look for a sticker, tag, or label on the item with a code
                starting with "FND-" or a QR code you can scan.
              </p>
            </div>

            {/* Privacy note */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Your information stays private. The owner will only see your
                message, not your personal details.
              </p>
            </div>
          </div>
        ) : !isSent ? (
          /* Message State */
          <div className="space-y-6">
            {/* Item Card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-2xl">🎒</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item}</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {code || "FND-XXXX-XXXX"}
                  </p>
                </div>
              </div>
            </div>
            {/*User Message for Founder */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Owner Message:
                </label>
                {userMessage ? (
                  <p className="text-muted-foreground">{userMessage}</p>
                ) : (
                  <p className="text-muted-foreground">
                    No Message from Owner
                  </p>
                )}
              </div>
            </div>

            {/* Message Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your message
                </label>
                <Textarea
                  placeholder="Hi! I found your item at..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-28 rounded-2xl border-border bg-card resize-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Where did you find it?{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Coffee shop on Main St, bench near park..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 pl-12 rounded-2xl border-border bg-card focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full h-14 rounded-2xl text-lg font-medium gap-2 disabled:opacity-50"
            >
              <MessageSquare className="w-5 h-5" />
              Send to Owner
            </Button>

            <button
              onClick={handleReset}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Try a different code
            </button>
          </div>
        ) : (
          /* Success State */
          <div className="space-y-8">
            <div className="bg-card rounded-3xl border border-border p-8 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-2">
                You made someone's day
              </h2>
              <p className="text-muted-foreground">
                The owner has been notified and can now arrange to get their
                item back. Thank you for being kind.
              </p>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-14 rounded-2xl text-base bg-transparent"
            >
              Report Another Item
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
