"use server";
const locality = "Praha";

const getAddressSuggestions = async (query: string): Promise<TAddressSuggestion[]> => {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    apikey: process.env.APP_MAPY_CZ_API_KEY,
    lang: "cs",
    limit: "5",
    locality,
    query,
    type: "regional.address",
  });
  const response = await fetch(`https://api.mapy.cz/v1/suggest?${params}`);

  if (!response.ok) return [];
  const data = (await response.json()) as { items: TAddressSuggestion[] };

  return (data.items ?? []).filter(({ location }: TAddressSuggestion): boolean =>
    location.includes(locality),
  );
};

export { getAddressSuggestions };
