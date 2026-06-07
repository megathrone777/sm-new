import cs from "@/dictionaries/cs.json";

const getTranslation = <D extends (typeof cs)[keyof typeof cs]>(key: keyof typeof cs): D =>
  cs[key] as D;

export { getTranslation };
