import React from "react";

import { store } from "@/store";
import { Container } from "@/ui";

import {
  descriptionClass,
  itemClass,
  itemTextClass,
  itemTitleClass,
  layoutClass,
  listClass,
  titleClass,
  wrapperClass,
} from "./AdditionalInfo.css";

const AdditionalInfo: React.FC = async () => {
  const [
    { col1Text, col1Title, col2Text, col2Title, col3Text, col3Title, description, title },
    { additionalInfoBgUrl },
  ] = await Promise.all([store.additionalInfo.get(), store.shop.getSettings()]);

  if (!title) return null;

  const columns = [
    { count: "01", text: col1Text, title: col1Title },
    { count: "02", text: col2Text, title: col2Title },
    { count: "03", text: col3Text, title: col3Title },
  ];

  return (
    <div
      className={wrapperClass}
      id="delivery-section"
      style={additionalInfoBgUrl ? { backgroundImage: `url(${additionalInfoBgUrl})` } : undefined}
    >
      <Container>
        <div className={layoutClass}>
          <h2 className={titleClass}>{title}</h2>

          <div
            className={descriptionClass}
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }}
          />

          <div className={listClass}>
            {columns.map<React.ReactElement>(({ count, text, title: colTitle }) => (
              <div
                className={itemClass}
                data-count={count}
                key={count}
              >
                <p className={itemTitleClass}>{colTitle}</p>

                <div
                  className={itemTextClass}
                  dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export { AdditionalInfo };
