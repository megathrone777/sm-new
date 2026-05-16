import React from "react";

import { createDeliveryCondition } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { useTranslation } from "@/hooks";
import { Input } from "@/ui";

import { formClass } from "./CreateDeliveryCondition.css";

const CreateDeliveryCondition: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      className={formClass}
      formAction={createDeliveryCondition}
    >
      <Input
        label="Title"
        name="title"
        placeholder="Бесплатная"
        type="text"
      />

      <Input
        label="Distance from (m)"
        name="distanceFrom"
        placeholder="0"
        type="number"
      />

      <Input
        label="Distance to (m)"
        name="distanceTo"
        placeholder="1500"
        type="number"
      />

      <Input
        label={`Price (${t<string>("currency")})`}
        name="price"
        placeholder="0"
        type="number"
      />

      <Input
        label={`Min order (${t<string>("currency")})`}
        name="minimumOrderPrice"
        placeholder="100"
        type="number"
      />

      <Input
        label="Tier message"
        name="text"
        placeholder="Min. cena objednávky do 2km."
        type="text"
      />
    </FormLayout>
  );
};

export { CreateDeliveryCondition };
