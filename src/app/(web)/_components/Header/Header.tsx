import React from "react";

import { Container } from "@/theme/components";

import { Logo } from "./Logo";
import { Menu } from "./Menu";

import { wrapperClass, layoutClass } from "./Header.css";

const Header: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <Logo imageUrl="/uploads/logo_img.svg" />
        <Menu phone="+420 792 745 116" />
      </div>
    </Container>
  </div>
);

export { Header };
