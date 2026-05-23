import type { Layout } from "react-grid-layout";

export interface TProps {
  cols: number;
  defaultLayout: Layout;
  hint: string;
  initialLayout: Layout;
  onSave: (layout: Layout) => Promise<TActionResult>;
  title: string;
}
