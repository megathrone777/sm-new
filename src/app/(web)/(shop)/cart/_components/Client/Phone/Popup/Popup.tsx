import React, { useId } from "react";

import { inputClass, wrapperClass } from "./Popup.css";

import type { TProps } from "./Popup.types";

const Popup: React.FC<TProps> = ({
  children,
  onInputChange,
  onMouseDown,
  searchRef,
  searchValue,
}) => {
  const inputId = useId();

  return (
    <>
      <div className={wrapperClass}>
        <input
          autoComplete="off"
          className={inputClass}
          name={`search-input-phone-selectbox-${inputId}`}
          onChange={onInputChange}
          onMouseDown={onMouseDown}
          placeholder="Hledat..."
          ref={searchRef}
          spellCheck="false"
          type="text"
          value={searchValue}
        />
      </div>

      {children}
    </>
  );
};

export { Popup };
