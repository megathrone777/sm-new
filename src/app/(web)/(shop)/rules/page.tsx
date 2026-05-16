import React from "react";
import ReactMarkdown from "react-markdown";

import { store } from "@/store";
import { Container } from "@/ui";

import { layoutClass, wrapperClass } from "./page.css";

const Page: React.FC = async () => {
  const { content } = await store.rules.get();

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Container>
    </div>
  );
};

export { metadata } from "./metadata";
export default Page;
