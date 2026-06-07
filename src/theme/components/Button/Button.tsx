import React from "react";
import { Link as ViewTransitionLink } from "next-view-transitions";
import Link, { type LinkProps } from "next/link";

import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./Button.css";

import type { RouteType } from "next/dist/lib/load-custom-routes";
import type { TProps } from "./Button.types";

const Button: React.FC<TProps> = ({
  children,
  disabled,
  href,
  iconId,
  id,
  onClick,
  target,
  template = "normal",
  title,
  type = "button",
  value,
  withTransition,
}) => {
  const renderLink = (): React.ReactElement => {
    if (!href) return <></>;
    const linkProps: LinkProps<RouteType> = {
      className: buttonClass[template],
      href,
      target,
      title,
    };
    const linkContent: React.ReactNode = iconId ? (
      <Icon
        className={iconClass}
        id={iconId}
      />
    ) : (
      children
    );

    if (withTransition) {
      return <ViewTransitionLink {...linkProps}>{linkContent}</ViewTransitionLink>;
    }

    return <Link {...linkProps}>{linkContent}</Link>;
  };

  return href ? (
    renderLink()
  ) : (
    <button
      {...{ disabled, id, onClick, title, type, value }}
      className={buttonClass[template]}
    >
      {iconId ? (
        <Icon
          className={iconClass}
          id={iconId}
        />
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
