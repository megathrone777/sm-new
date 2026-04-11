import React from "react";

import { Container } from "@/ui";

import { Info } from "./Info";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

import { copyClass, copyTextClass, layoutClass, wrapperClass } from "./Footer.css";

import type { TProps } from "./Footer.types";

const Footer: React.FC<TProps> = async ({
  address,
  allergeny,
  allergenyUrl,
  businessName,
  contactItems,
  email,
  logoUrl,
  navigation,
  phone,
}) => {
  const year = new Date().getFullYear();

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <Logo imageUrl={logoUrl} />
          {navigation && !!navigation.length && <Menu items={navigation} />}

          {contactItems && !!contactItems.length && (
            <Info
              {...{ address, allergeny, allergenyUrl, businessName, contactItems, email, phone }}
            />
          )}
        </div>
      </Container>

      <div className={copyClass}>
        <p className={copyTextClass}>&copy; {year} All rights reserved.</p>
      </div>
    </div>
  );
};

export { Footer };
