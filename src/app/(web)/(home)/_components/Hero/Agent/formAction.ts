"use server";
import { sendAgentMessage } from "@/services";

const formAction = async (_state: null | string, formData: FormData): Promise<null | string> => {
  const message = `${formData.get("message") || ""}`.trim();
  const result = await sendAgentMessage(message);

  if (result && result.length > 0) {
    return result;
  }

  return null;
};

export { formAction };
