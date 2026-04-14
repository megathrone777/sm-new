import React from "react";

import { Hero } from "@/app/(web)/(shop)/_components";
import { Footer, Header } from "@/app/(web)/_components";
import { Error } from "@/components";
import { shopHelpers } from "@/helpers/shop";

const Page: React.FC = async () => {
  const {
    address,
    allergeny,
    allergenyUrl,
    businessName,
    contactItems,
    email,
    logoUrl,
    navigation,
    phone,
  } = await shopHelpers.getSettings();

  return (
    <>
      <Header {...{ logoUrl, navigation, phone }} />
      <Hero />
      <Error title="Stránka nenalezena" />

      <Footer
        {...{
          address,
          allergeny,
          allergenyUrl,
          businessName,
          contactItems,
          email,
          logoUrl,
          navigation,
          phone,
        }}
      />
    </>
  );
};

export default Page;
