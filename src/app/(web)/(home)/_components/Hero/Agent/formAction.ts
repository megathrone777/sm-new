"use server";
import { sendAgentMessage } from "@/services";

const formAction = async (_state: null | TActionResult, formData: FormData): Promise<null | TActionResult> => {
  const message = `${formData.get("message") || ""}`.trim();

  if (!message) return null;

  return sendAgentMessage(message);
};

export { formAction };
