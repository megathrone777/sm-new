import cs from "@/dictionaries/cs.json";

const useTranslation = (): {
  t: <D extends (typeof cs)[keyof typeof cs]>(key: keyof typeof cs) => D;
} => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  t: (key) => cs[key],
});

export { useTranslation };
