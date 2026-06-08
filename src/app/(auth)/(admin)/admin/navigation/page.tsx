import React from "react";

import { updateNavigationTitle } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Input } from "@/ui";

import { formClass, itemClass, listClass } from "./page.css";

const Page: React.FC = async () => {
  const { navigation } = await store.shop.getSettings();

  return (
    <>
      <Header title="Navigation" />

      <div className={listClass}>
        {navigation.map((item: TNavItem) => (
          <div
            className={itemClass}
            key={`nav-item-${item.href}`}
          >
            <FormLayout
              formAction={updateNavigationTitle}
              layoutClassName={formClass}
            >
              <input
                name="href"
                type="hidden"
                value={item.href as string}
              />

              <Input
                defaultValue={item.href as string}
                label="Href"
                readOnly
                type="text"
              />

              <Input
                defaultValue={item.title}
                label="Title"
                name="title"
                type="text"
              />
            </FormLayout>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
