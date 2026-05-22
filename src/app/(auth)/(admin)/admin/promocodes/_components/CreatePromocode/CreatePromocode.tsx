import React from "react";

import { createPromocode } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { Checkbox, Input } from "@/ui";

import { formClass, formLayoutClass } from "./CreatePromocode.css";

const CreatePromocode: React.FC = () => (
  <FormLayout
    className={formClass}
    formAction={createPromocode}
    layoutClassName={formLayoutClass}
  >
    <Input
      label="Code"
      name="code"
      placeholder="CODE"
      type="text"
    />

    <Input
      label="Discount (%)"
      name="discount"
      placeholder="10"
      type="number"
    />

    <Input
      label="Activate at (optional)"
      name="activatedAt"
      type="datetime-local"
    />

    <Checkbox
      label="One-time"
      name="oneTime"
      type="checkbox"
    />
  </FormLayout>
);

export { CreatePromocode };
