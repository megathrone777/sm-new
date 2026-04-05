import React from "react";
import Link from "next/link";

import { logout } from "@/app/(auth)/_actions";
import { Button, Icon } from "@/ui";

import {
  goLinkClass,
  iconClass,
  imageClass,
  linkClass,
  sideClass,
  wrapperClass,
} from "./Header.css";

const Header: React.FC = () => (
  <div className={wrapperClass}>
    <Link
      className={linkClass}
      href="/admin"
    >
      <img
        alt="Logo."
        className={imageClass}
        src="/uploads/logo_img.svg"
      />
    </Link>

    <div className={sideClass}>
      <Link
        className={goLinkClass}
        href="/"
        target="_blank"
      >
        <Icon
          className={iconClass}
          id="globe"
        />

        <span>Go To Web</span>
      </Link>

      <Link
        className={goLinkClass}
        href="/orders"
        target="_blank"
      >
        <Icon
          className={iconClass}
          id="buy"
        />

        <span>Orders</span>
      </Link>

      <form action={logout}>
        <Button
          template="small"
          type="submit"
        >
          Logout
        </Button>
      </form>
    </div>
  </div>
);

export { Header };
