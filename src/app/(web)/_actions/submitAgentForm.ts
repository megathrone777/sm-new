"use server";
import { sendModelMessage } from "@/services";

import type { ModelMessage } from "ai";

interface TAgentState extends TActionResult {
  history: ModelMessage[];
}

const submitAgentForm = async (
  state: null | TAgentState,
  formData: FormData,
): Promise<null | TAgentState> => {
  const message = `${formData.get("message") || ""}`.trim();

  if (!message) return state;
  const history = state?.history ?? [];
  const result = await sendModelMessage(message, history);

  return {
    history: [
      ...history,
      { content: message, role: "user" },
      { content: result.message, role: "assistant" },
    ],
    message: result.message,
    type: result.type,
  };
};

export { submitAgentForm };
