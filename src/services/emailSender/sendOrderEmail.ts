import nodemailer from "nodemailer";

import { store } from "@/store";

import { generateTemplate } from "./generateTemplate";

const sendOrderEmail = async (order: TOrder): Promise<boolean> => {
  if (process.env.EMAIL_ORDER_CONFIRMATION_ENABLED !== "true") return false;
  const user = process.env.EMAIL_ADDRESS;
  const pass = process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass || !order.clientEmail) return false;

  try {
    const { address, businessName, email, logoUrl, phone } = await store.shop.getSettings();
    const html = await generateTemplate({
      order,
      pickupAddress: address,
      shopSettings: { businessName, email, logoUrl, phone },
    });
    const transporter = nodemailer.createTransport({
      auth: { pass, user },
      host: "smtp.gmail.com",
      secure: false,
      service: "gmail",
    });
    const info = await transporter.sendMail({
      from: user,
      html,
      subject: `${process.env.PUBLIC_URL?.replace(/^https?:\/\//, "") ?? ""}: Potvrzení objednávky #${order.id}`,
      to: order.clientEmail,
    });

    return info.accepted.length === 1;
  } catch (error) {
    console.error("sendOrderEmail failed", error);

    return false;
  }
};

export { sendOrderEmail };
