import fs from "fs";
import path from "path";

import moment from "moment";
import pug from "pug";

import type { TGenerateTemplateInput } from "./emailSender.types";

const PAYMENT_LABEL: Record<TPaymentType, string> = {
  card: "Kartou",
  cardAfterDelivery: "Kartou na místě",
  cash: "Hotovost",
};

const TEMPLATE_DIR = path.join(process.cwd(), "src", "services", "emailSender", "template");
const TEMPLATE_PATH = path.join(TEMPLATE_DIR, "template.pug");

const generateTemplate = async ({
  order,
  pickupAddress,
  shopSettings,
}: TGenerateTemplateInput): Promise<string> => {
  const source = await fs.promises.readFile(TEMPLATE_PATH, "utf8");
  const compile = pug.compile(source, {
    basedir: TEMPLATE_DIR,
    filename: TEMPLATE_PATH,
  });

  return compile({
    company: {
      email: shopSettings.email,
      name: shopSettings.businessName,
      phone: shopSettings.phone,
      webAddress: "https://sushi-man.cz",
    },
    moment,
    order,
    paymentType: PAYMENT_LABEL[order.paymentType],
    pickupAddress,
    title: `sushi-man.cz: Objednávka #${order.id}`,
  });
};

export { generateTemplate };
