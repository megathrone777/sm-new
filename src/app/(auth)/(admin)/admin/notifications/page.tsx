import React from "react";

import { updateSmsTemplate } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { SMS_TEMPLATE_KEYS } from "@/store/smsTemplates";

import { gridClass, hintClass, itemClass, textareaClass, titleClass } from "./page.css";

const TEMPLATE_LABELS: Record<TSmsTemplateKey, string> = {
  newOrderDelivery: "SMS: new delivery order",
  newOrderDeliveryCustomDeliveryTime: "SMS: new delivery order — custom time",
  newOrderPickup: "SMS: new pickup order",
  newOrderPickupCustomDeliveryTime: "SMS: new pickup order — custom time",
  orderIsOnTheWay: "SMS: courier picked up the order",
  orderIsReadyToPickup: "SMS: order is ready to pickup",
};

const Page: React.FC = async () => {
  const templates = await store.smsTemplates.getAll();

  return (
    <>
      <Header title="Notifications" />

      <div className={gridClass}>
        {SMS_TEMPLATE_KEYS.map((key: TSmsTemplateKey) => (
          <div
            className={itemClass}
            key={`sms-${key}`}
          >
            <p className={titleClass}>{TEMPLATE_LABELS[key]}</p>

            <FormLayout formAction={updateSmsTemplate}>
              <input
                name="key"
                type="hidden"
                value={key}
              />

              <textarea
                className={textareaClass}
                defaultValue={templates[key]}
                name="text"
                rows={5}
              />
            </FormLayout>

            <p className={hintClass}>Tokens: #orderId, orderPickupAddress, orderDeliveryTime</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
