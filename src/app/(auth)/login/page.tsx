import React from "react";
import Form from "next/form";
import Image from "next/image";

import { login } from "@/app/(auth)/_actions";
import { store } from "@/store";
import { Button, Container, Input } from "@/ui";

import { formClass, imageClass, layoutClass, titleClass, wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/login">> = async () => {
  const { logoUrl } = await store.shop.getSettings();

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <Image
            alt="Admin logo."
            className={imageClass}
            height={0}
            priority
            sizes="100vw"
            src={logoUrl}
            width={0}
          />

          <h1 className={titleClass}>Administrator</h1>

          <Form
            action={(formData) => void login(formData)}
            className={formClass}
          >
            <Input
              light
              name="login"
              placeholder="Login"
              type="text"
            />

            <Input
              light
              name="password"
              placeholder="Password"
              type="password"
            />

            <Button type="submit">Sign in</Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Page;
