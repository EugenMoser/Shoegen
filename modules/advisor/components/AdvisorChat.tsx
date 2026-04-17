"use client";
import {
  useEffect,
  useState,
} from 'react';

import {
  DefaultChatTransport,
  DynamicToolUIPart,
} from 'ai';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';

import { FilterShoesParams } from '../types';
import AdvisorMessage from './AdvisorMessage';

export default function AdvisorChat(): React.JSX.Element {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/advisor" }),
  });
  const isLoading = status === "streaming" || status === "submitted";
  const [input, setInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.parts) return;
    const toolPart = lastMessage.parts.find(
      (part): part is DynamicToolUIPart =>
        part.type === "dynamic-tool" &&
        (part as DynamicToolUIPart).toolName === "filterShoes" &&
        (part as DynamicToolUIPart).state === "output-available",
    );
    if (!toolPart) return;

    const args = (
      toolPart as Extract<DynamicToolUIPart, { state: "output-available" }>
    ).input as FilterShoesParams;
    const params = new URLSearchParams();

    // Only include parameters that have values to avoid cluttering the URL
    if (args.categories?.length)
      params.set("categories", args.categories.join(","));
    if (args.terrains?.length)
      params.set("terrains", args.terrains.join(","));
    if (args.seasons?.length)
      params.set("seasons", args.seasons.join(","));
    if (args.waterproof) params.set("waterproof", "true");
    if (args.minPrice !== undefined)
      params.set("minPrice", String(args.minPrice));
    if (args.maxPrice !== undefined)
      params.set("maxPrice", String(args.maxPrice));
    if (args.brands) params.set("brands", args.brands);

    router.replace(`/shop?${params.toString()}`);
  }, [messages, router]);

  return (
    <Card className="max-w-full w-full h-full p-4 flex flex-col gap-4 ">
      <CardHeader>
        <CardTitle>
          Frag mich nach Empfehlungen oder Tipps rund um Schuhe!
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {messages.map((masage) => {
          const textPart = masage.parts.find(
            (part) => part.type === "text",
          );
          const content = textPart?.type === "text" ? textPart.text : "";
          return (
            <AdvisorMessage
              key={masage.id}
              role={masage.role as "user" | "assistant"}
              content={content}
            />
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
        >
          <Input
            placeholder="Frag mich"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2"
          >
            Senden
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
