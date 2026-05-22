import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";

import { AvailabilityToggle } from "./_components";

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
};

const Page: React.FC<PageProps<"/admin">> = async () => {
  const { isAvailable } = await store.shop.getSettings();

  return (
    <>
      <Header title={getGreeting()} />
      <AvailabilityToggle initialValue={isAvailable} />
    </>
  );
};

export default Page;
