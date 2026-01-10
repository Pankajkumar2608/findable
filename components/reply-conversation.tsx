
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    MessageSquare,
    Check,
    MapPin,
    User,
} from "lucide-react";

interface ReplyConversationProps {
    itemId: string;
    itemName: string;
    finderMessage: string | null;
    location: string | null;
    previousReply: string | null;
}

export function ReplyConversation({
    itemId,
    itemName,
    finderMessage,
    location,
    previousReply,
}: ReplyConversationProps) {
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSendReply = async () => {
        if (!message.trim()) return;
        setSending(true);
        try {
            const response = await fetch("/api/reply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: itemId, message }),
            });

            if (response.ok) {
                setIsSent(true);
            } else {
                alert("Failed to send reply. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="px-6 pt-32 pb-24">
            <div className="mx-auto max-w-xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary mb-6">
                        <MessageSquare className="w-4 h-4" />
                        <span>Reply to Finder</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
                        Re: {itemName}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Reply to the person who found your item.
                    </p>
                </div>

                {!isSent ? (
                    <div className="space-y-8">
                        {/* Finder's Message Card */}
                        <div className="bg-secondary/30 rounded-3xl p-8 border border-border">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Finder's Message</h3>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {finderMessage || "No message provided."}
                                    </div>
                                </div>
                            </div>

                            {location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground pl-14">
                                    <MapPin className="w-4 h-4" />
                                    <span>Found at: {location}</span>
                                </div>
                            )}
                        </div>

                        {/* Previous Reply if any */}
                        {previousReply && (
                            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 ml-8">
                                <p className="text-xs text-primary mb-2 uppercase tracking-wider font-semibold">Your Previous Reply</p>
                                <p className="text-foreground">{previousReply}</p>
                            </div>
                        )}

                        {/* Reply Form */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-foreground">
                                Your Reply
                            </label>
                            <Textarea
                                placeholder="Thank you so much! I can meet you..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-32 rounded-2xl border-border bg-card resize-none focus:ring-2 focus:ring-primary/20"
                            />
                            <Button
                                onClick={handleSendReply}
                                disabled={!message.trim() || sending}
                                className="w-full h-14 rounded-2xl text-lg font-medium gap-2 disabled:opacity-50"
                            >
                                {sending ? "Sending..." : "Send Reply"}
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Your email address remains private.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-card rounded-3xl border border-border p-8 shadow-sm text-center">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-accent" />
                            </div>
                            <h2 className="text-xl font-medium text-foreground mb-2">
                                Reply Sent
                            </h2>
                            <p className="text-muted-foreground">
                                Your message has been sent to the finder via email.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
