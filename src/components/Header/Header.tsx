import React from "react";
// import { usePathname } from "next/navigation";

// import { Theme } from "@/theme";
// import { Cart } from "./Cart";
// import { Logo } from "./Logo";
// import { Menu } from "./Menu";
import { wrapperClass, layoutClass } from "./Header.css";

import type { TProps } from "./Header.types";

const Header: React.FC<TProps> = () => {
  // const pathname = usePathname();
  // const logoURL = `${process.env.NEXT_PUBLIC_API_URI}${logo.data[0].attributes.url}`;

  return (
    <div
      className={wrapperClass}
      id="header"
    >
      {/* <Theme.Container> */}
      <div className={layoutClass}>
        {/* <Logo imageURL={logoUrl} />
          <Menu {...{ phone }} /> */}
        {/* {isOpened && pathname !== "/cart" && <Cart />} */}
      </div>
      {/* </Theme.Container> */}
    </div>
  );
};

export { Header };
