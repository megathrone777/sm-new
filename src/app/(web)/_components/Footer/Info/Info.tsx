import React from "react";
import Link from "next/link";

import { useTranslation } from "@/hooks";

import {
  contactItemClass,
  contactLinkClass,
  contactListClass,
  emailClass,
  itemClass,
  linkClass,
  textClass,
  wrapperClass,
} from "./Info.css";

import type { TProps } from "./Info.types";

const Info: React.FC<TProps> = ({
  address,
  allergenyUrl,
  businessName,
  contactItems,
  email,
  phone,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={wrapperClass}>
        <ul className={contactListClass}>
          {contactItems.map<React.ReactElement>(({ link, type }: TContactLink) => (
            <li
              className={contactItemClass[type]}
              key={`footer-contact-${type}`}
            >
              <a
                className={contactLinkClass}
                href={link}
                target="_blank"
              >
                {type}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {phone && email && address && (
        <>
          <p className={itemClass}>
            <a
              className={linkClass}
              href={`tel:${phone.replace(/ /g, "")}`}
            >
              {phone}
            </a>
          </p>

          <p className={itemClass}>
            <a
              className={linkClass}
              href={`/uploads/${allergenyUrl}`}
            >
              {t<string>("allergeny")}
            </a>
          </p>

          <p className={itemClass}>
            <Link
              className={linkClass}
              href="/terms"
            >
              Všeobecné obchodní podmínky
            </Link>
          </p>

          <p className={itemClass}>
            <Link
              className={linkClass}
              href="/rules"
            >
              Zásady ochrany osobních údajů
            </Link>
          </p>

          {address && address.length > 0 && <p className={textClass}>{`Provozovna: ${address}`}</p>}
          <p className={textClass}>{businessName}</p>

          <a
            className={emailClass}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </>
      )}
    </>
  );
};

export { Info };
