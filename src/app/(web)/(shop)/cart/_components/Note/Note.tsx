import React from "react";

import { Icon } from "@/ui";

import { iconClass, textareaClass, wrapperClass } from "./Note.css";

const Note: React.FC = () => {
  // const handleNoteChange = ({ currentTarget }: React.SyntheticEvent<HTMLTextAreaElement>): void => {
  // dispatch(setNote(currentTarget.value));
  // };

  return (
    <>
      <div className={wrapperClass}>
        <Icon
          className={iconClass}
          id="note"
        />

        <textarea
          className={textareaClass}
          maxLength={250}
          name="note"
          placeholder="Pokud si přejete vynechat sezam nebo pálivou omáčku, tak stačí napsat sem..."
        />
      </div>
    </>
  );
};

export { Note };
