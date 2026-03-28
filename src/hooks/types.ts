import type cs from "~/dictionaries/cs.json";

export interface TUseTranslation {
  (): {
    t: <D extends (typeof cs)[keyof typeof cs]>(key: keyof typeof cs) => D;
  };
}
