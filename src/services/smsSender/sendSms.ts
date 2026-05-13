import type { TBulkgateResponse, TSendSmsInput } from "./smsSender.types";

const sendSms = async ({ number, text }: TSendSmsInput): Promise<boolean> => {
  if (process.env.SMS_BULKGATE_IS_ENABLED !== "true") {
    console.info(`[SMS disabled] would send to +${number}: ${text}`);

    return true;
  }

  const application_id = process.env.SMS_BULKGATE_APPLICATION_ID;
  const application_token = process.env.SMS_BULKGATE_APPLICATION_TOKEN;
  const sender_id = process.env.SMS_BULKGATE_SENDER_ID;
  const sender_id_value = process.env.SMS_BULKGATE_SENDER_ID_VALUE;

  if (!application_id || !application_token || !sender_id || !sender_id_value || !number) {
    return false;
  }

  try {
    const response = await fetch("https://portal.bulkgate.com/api/1.0/simple/transactional", {
      body: JSON.stringify({
        application_id,
        application_token,
        number,
        sender_id,
        sender_id_value,
        text,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const json = (await response.json()) as TBulkgateResponse;

    return json.data?.status === "accepted";
  } catch (error) {
    console.error("sendSms failed", error);

    return false;
  }
};

export { sendSms };
