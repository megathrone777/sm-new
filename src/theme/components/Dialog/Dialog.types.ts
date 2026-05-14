export interface TProps extends Pick<TShopSettings, "contactItems" | "title"> {
  isOpened: boolean;
  isShopOpen: boolean;
  onClose: () => void;
  text: string;
}
