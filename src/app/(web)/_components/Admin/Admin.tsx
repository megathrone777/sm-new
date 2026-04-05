import React from "react";
import Link from "next/link";

import { Icon } from "@/ui";

import { wrapperClass, layoutClass, linkClass, iconClass } from "./Admin.css";

const Admin: React.FC = () => (
  <div className={wrapperClass}>
    <div className={layoutClass}>
      <Link
        className={linkClass}
        href="/admin"
      >
        <Icon
          className={iconClass}
          id="profile"
        />
      </Link>
    </div>
  </div>
);

export { Admin };
