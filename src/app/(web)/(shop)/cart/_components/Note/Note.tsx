import React from "react";

import { Icon } from "@/ui";

import { iconClass, textareaClass, wrapperClass } from "./Note.css";

import type { TProps } from "./Note.types";

const Note: React.FC<TProps> = ({ defaultValue }) => (
  <div className={wrapperClass}>
    <Icon
      className={iconClass}
      id="note"
    />

    <textarea
      className={textareaClass}
      defaultValue={defaultValue}
      maxLength={250}
      name="note"
      placeholder="Pokud si přejete vynechat sezam nebo pálivou omáčku, tak stačí napsat sem..."
    />
  </div>
);

export { Note };
