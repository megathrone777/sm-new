import React from "react";

import { store } from "@/store";
import { ContactLinks, Container, Icon } from "@/ui";

import {
  addressClass,
  addressLinkClass,
  buttonClass,
  colClass,
  companyLineClass,
  emailClass,
  iconClass,
  imageClass,
  imageColClass,
  imageHolderClass,
  instagramColClass,
  instagramTitleClass,
  layoutClass,
  linksClass,
  phoneClass,
  phoneLinkClass,
  scheduleClass,
  scheduleIconClass,
  secondaryTitleClass,
  titleClass,
  wrapperClass,
} from "./Details.css";

const Details: React.FC = async () => {
  const { address, closedByScheduleText, companyDetails, contactItems, email, phone } =
    await store.shop.getSettings();

  const instagramItem = contactItems.find(({ type }) => type === "instagram");
  const instagramLink = instagramItem?.link ?? "https://www.instagram.com/sushiman_prague/";

  return (
    <section className={wrapperClass}>
      <Container>
        <h1 className={titleClass}>Kontakty</h1>

        <div className={layoutClass}>
          <div className={colClass}>
            <div className={scheduleClass}>
              <Icon
                className={scheduleIconClass}
                id="time"
              />

              <div dangerouslySetInnerHTML={{ __html: closedByScheduleText }} />
            </div>

            <p className={addressClass}>
              <Icon
                className={iconClass}
                id="address"
              />

              <span>Provozovna: </span>

              <a
                className={addressLinkClass}
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {address}
              </a>

              {" — Rozvoz, Pickup a Restaurace"}
            </p>

            <p className={phoneClass}>
              <Icon
                className={iconClass}
                id="phone"
              />

              <a
                className={phoneLinkClass}
                href={`tel:${phone.replace(/ /g, "")}`}
              >
                {phone}
              </a>
            </p>

            <a
              className={emailClass}
              href={`mailto:${email}`}
              target="_blank"
            >
              <Icon
                className={iconClass}
                id="email"
              />

              {email}
            </a>

            {contactItems.length > 0 && (
              <div className={linksClass}>
                <ContactLinks items={contactItems} />
              </div>
            )}

            <h2 className={secondaryTitleClass}>Firemní údaje</h2>

            <div>
              {companyDetails.split("\n").map<React.ReactElement>((line: string) => (
                <p
                  className={companyLineClass}
                  key={crypto.randomUUID()}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className={imageColClass}>
            <div className={imageHolderClass}>
              <img
                alt="Sushi-man"
                className={imageClass}
                src="/images/success_img.png"
              />
            </div>
          </div>

          <div className={instagramColClass}>
            <h3 className={instagramTitleClass}>Přihlaste se k odběru našeho Instagramu</h3>

            <a
              className={buttonClass}
              href={instagramLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Otevřit Instagram
            </a>

            <div className={imageHolderClass}>
              <a
                href={instagramLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Sushi-man instagram."
                  className={imageClass}
                  src="/images/instagram_img.png"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Details };
