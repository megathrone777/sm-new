import React from "react";

import { store } from "@/store";
import { Container, ContactLinks } from "@/ui";
import { isShopOpened } from "@/utils";

import {
  contactsClass,
  layoutClass,
  statusClass,
  statusOnlineClass,
  timeClass,
  titleClass,
  wrapperClass,
} from "./Schedule.css";

const Schedule: React.FC = async () => {
  const { closedByScheduleText, contactItems, isAvailable, schedule, scheduleImageUrl } =
    await store.shop.getSettings();

  const shopIsOpened = isShopOpened(schedule, isAvailable);

  return (
    <section
      className={wrapperClass}
      style={scheduleImageUrl ? { backgroundImage: `url(${scheduleImageUrl})` } : undefined}
    >
      <Container>
        <div className={layoutClass}>
          <h2 className={titleClass}>Provozní doba</h2>

          <p
            className={timeClass}
            dangerouslySetInnerHTML={{ __html: closedByScheduleText }}
          />

          {contactItems.length > 0 && (
            <div className={contactsClass}>
              <ContactLinks items={contactItems} />
            </div>
          )}

          <p className={shopIsOpened ? `${statusClass} ${statusOnlineClass}` : statusClass}>
            {shopIsOpened ? "online" : "offline"}
          </p>
        </div>
      </Container>
    </section>
  );
};

export { Schedule };
