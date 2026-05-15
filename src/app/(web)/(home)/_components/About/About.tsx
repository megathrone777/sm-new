import React from "react";

import { store } from "@/store";
import { Container } from "@/ui";

import { textClass, titleClass, wrapperClass } from "./About.css";

const About: React.FC = async () => {
  const { description, imageUrl, title } = await store.about.get();

  return (
    <div
      className={wrapperClass}
      id="about-section"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <Container>
        <h2 className={titleClass}>{title}</h2>

        <div
          className={textClass}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Container>
    </div>
  );
};

export { About };