import React from "react";
import Link from "next/link";

import { logout } from "@/app/(auth)/_actions";
import { store } from "@/store";
import { Button, Icon } from "@/ui";

import { Menu } from "./Menu";

import {
  buttonClass,
  buttonIconClass,
  buttonLabelClass,
  imageClass,
  layoutClass,
  logoLinkClass,
  wrapperClass,
} from "./Header.css";

const Header: React.FC = async () => {
  const [session, { logoUrl }] = await Promise.all([
    store.sessions.get(),
    store.shop.getSettings(),
  ]);

  return (
    <div className={wrapperClass}>
      <Link
        className={logoLinkClass}
        href="/admin"
      >
        <img
          alt="Sushi man logo."
          className={imageClass}
          src={logoUrl}
        />
      </Link>

      <div className={layoutClass}>
        <Menu role={session && session.role ? session.role : null} />

        <form action={logout}>
          <Button
            className={buttonClass}
            template="small"
            type="submit"
          >
            <span className={buttonLabelClass}>Logout</span>

            <Icon
              className={buttonIconClass}
              id="logout"
            />
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Header };
