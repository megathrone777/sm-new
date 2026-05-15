import React from "react";

import { itemClass, linkClass, listClass } from "./ContactLinks.css";

interface TProps {
  items: TContactLink[];
}

const ContactLinks: React.FC<TProps> = ({ items }) => (
  <ul className={listClass}>
    {items.map<React.ReactElement>(({ link, type }: TContactLink) => (
      <li
        className={itemClass[type]}
        key={type}
      >
        <a
          className={linkClass}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {type}
        </a>
      </li>
    ))}
  </ul>
);

export { ContactLinks };
