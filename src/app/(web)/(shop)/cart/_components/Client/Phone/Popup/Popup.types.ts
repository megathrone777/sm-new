import type React from "react";

export interface TProps {
  children: React.ReactNode;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  searchValue: string;
}
