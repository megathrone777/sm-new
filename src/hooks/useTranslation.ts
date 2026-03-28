import cs from "@/dictionaries/cs.json";

import type { TUseTranslation } from "./types";

const useTranslation: TUseTranslation = () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  t: (key) => cs[key],
});

export { useTranslation };
