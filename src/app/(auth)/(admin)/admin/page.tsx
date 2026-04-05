import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
};

const Page: React.FC = () => <Header title={getGreeting()} />;

export { metadata } from "./metadata";
export default Page;
