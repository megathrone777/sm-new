export interface TProps extends Pick<
  TShopSettings,
  "contactItems" | "isOpened" | "text" | "title"
> {
  onClose: () => void;
}
