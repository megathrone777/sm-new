import type { FlattenOptionData } from "@rc-component/select/lib/interface";
import type { TOptionData } from "./Option";

export interface TPopupContentProps {
  children: React.ReactNode;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  searchValue: string;
}

export type TOption = FlattenOptionData<TOptionData>;

export type TProps = Pick<TClient, "phoneNumber"> & {
  isError?: boolean;
};
