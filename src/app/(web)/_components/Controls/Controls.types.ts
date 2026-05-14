export type TProps = Pick<TShopSettings, "contactItems" | "title"> & {
  closedText: string;
  closedTitle: string;
  isOpened: boolean;
  text: string;
};
