"use server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const sendAgentMessage = async (message: string): Promise<string> => {
  const { text } = await generateText({
    allowSystemInMessages: true,
    messages: [
      { content: "Vždy odpovídej česky.", role: "system" },
      { content: message, role: "user" },
    ],
    model: anthropic("claude-haiku-4-5"),
  });

  return text;
};

export { sendAgentMessage };
