"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Download, Copy, Check, QrCode, Tag, Mail, MessageCircleHeart } from "lucide-react";
import  QRCode  from "qrcode";
import { Textarea } from "./ui/textarea";
import Loader from "./ui/loader";


const ITEM_SUGGESTIONS = [
  "Laptop",
  "Phone",
  "Wallet",
  "Keys",
  "Backpack",
  "Headphones",
  "Camera",
  "Tablet",
];

export function GenerateCode() {
  const [itemName, setItemName] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uniqueCode, setUniqueCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [email, setEmail] = useState("");
  const [founderMessage, setFounderMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!itemName.trim()) return;
    setLoading(true);
    // Generate a random unique code
    const generateCode = fetch("/api/generateCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName , email: email, message: founderMessage }),
    });
    const response = await generateCode;
    const data = await response.json();
    const qr = await QRCode.toDataURL(data.claimUrl,{
      width: 512,
      margin: 2,
    });
    setQrCode(qr);
    setUniqueCode(data.code);
    setIsGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://findable.app/found/${uniqueCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setItemName("");
    setIsGenerated(false);
    setUniqueCode("");
  };

  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-muted-foreground mb-6">
            <QrCode className="w-4 h-4" />
            <span>Free to generate</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
            {isGenerated ? "Your code is ready" : "Generate a code"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isGenerated
              ? `Attach this to your ${itemName} and you're protected.`
              : "Name your item and get a unique code in seconds."}
          </p>
        </div>

        {!isGenerated ? (
          /* Input State */
          <div className="space-y-6">
            {/* Main Input */}
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What item do you want to protect?"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={(e: any) => e.key === "Enter" && handleGenerate()}
                className="h-14 pl-12 pr-4 text-lg rounded-2xl border-border bg-card shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg rounded-2xl border-border bg-card shadow-sm focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs mt-2 rounded-2xl text-muted-foreground">
                Use to notify you when your item is found
              </p>
            </div>
            <div className="relative">
              <MessageCircleHeart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Textarea
                placeholder="message for founder"
                value={founderMessage}
                onChange={(e) => setFounderMessage(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg rounded-2xl placeholder:center border-border bg-card shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
              {ITEM_SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => setItemName(item)}
                  className="px-4 py-2 text-sm rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Generate Button */}
            {!loading ? (
              <Button
              onClick={handleGenerate}
              disabled={!itemName.trim()}
              className="w-full h-14 rounded-2xl text-lg font-medium gap-2 disabled:opacity-50"
            >
              Generate Code
              <ArrowRight className="w-5 h-5" />
            </Button>
            ) : (
              <Loader />
            )
            }

            <p className="text-center text-sm text-muted-foreground">
              No account needed. Your privacy is protected.
            </p>
          </div>
        ) : (
          /* Generated State */
          <div className="space-y-8">
            {/* QR Code Card */}
            <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex flex-col items-center">
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-foreground rounded-2xl flex items-center justify-center mb-6">
                  <div className="w-40 h-40 bg-card rounded-xl grid grid-cols-5 grid-rows-5 gap-1 p-2">
                    {qrCode && <img src={qrCode} alt="QR Code" />}
                  </div>
                </div>

                {/* Code Display */}
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Unique Code
                  </p>
                  <p className="text-2xl font-mono font-semibold tracking-wider text-foreground">
                    {uniqueCode}
                  </p>
                </div>

                {/* Item Label */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
                  <Tag className="w-4 h-4" />
                  <span>{itemName}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 rounded-2xl gap-2 text-base bg-transparent"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button className="h-14 rounded-2xl gap-2 text-base">
                <Download className="w-5 h-5" />
                Download
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-secondary/50 rounded-2xl p-6">
              <h3 className="font-medium text-foreground mb-3">Next steps</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  <span>Download or print the QR code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  <span>Attach it to your {itemName.toLowerCase()}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                  <span>If found, the finder can contact you instantly</span>
                </li>
              </ol>
            </div>

            {/* Generate Another */}
            <button
              onClick={handleReset}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Generate another code
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
