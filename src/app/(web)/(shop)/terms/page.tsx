import React from "react";
import ReactMarkdown from "react-markdown";

import { Container } from "@/ui";

import { wrapperClass, layoutClass } from "./page.css";

const Page: React.FC = async () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <ReactMarkdown>Terms</ReactMarkdown>
      </div>
    </Container>
  </div>
);

export { metadata } from "./metadata";
export default Page;
