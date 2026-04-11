import React from "react";

import { Container } from "@/ui";

import { Logo } from "./Logo";
import { Menu } from "./Menu";

import { wrapperClass, layoutClass } from "./Header.css";

import type { TProps } from "./Header.types";

const Header: React.FC<TProps> = ({ logoUrl, navigation, phone }) => (
  <div
    className={wrapperClass}
    id="header"
  >
    <Container>
      <div className={layoutClass}>
        <Logo imageUrl={logoUrl} />

        {navigation && !!navigation.length && (
          <Menu
            {...{ phone }}
            items={navigation}
          />
        )}
      </div>
    </Container>
  </div>
);

export { Header };
