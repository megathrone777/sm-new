import React from "react";

import { createPromocode } from "@/app/(auth)/(admin)/_actions";
import { FormLayout } from "@/app/(auth)/(admin)/_components";
import { Input } from "@/ui";

import { formClass } from "./CreatePromocode.css";

const CreatePromocode: React.FC = () => (
  <FormLayout
    className={formClass}
    formAction={createPromocode}
  >
    <Input
      label="Code"
      name="code"
      placeholder="SUMMER20"
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
  </FormLayout>
);

export { CreatePromocode };
