import React from "react";
import Link from "next/link";

import { logout } from "@/app/(auth)/_actions";
import { Button } from "@/ui";

import { linkClass, wrapperClass, imageClass } from "./Header.css";

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

    <form action={logout}>
      <Button
        template="small"
        type="submit"
      >
        Logout
      </Button>
    </form>
  </div>
);

export { Header };
