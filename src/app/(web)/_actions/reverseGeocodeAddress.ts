"use server";

type TRgeocodeResponse = {
  items: TAddressSuggestion[];
};

const reverseGeocodeAddress = async (
  lat: number,
  lon: number,
): Promise<null | TAddressSuggestion> => {
  const params = new URLSearchParams({
    apikey: process.env.MAPY_CZ_API_KEY ?? "",
    lang: "cs",
    lat: `${lat}`,
    lon: `${lon}`,
  });
  const response = await fetch(`https://api.mapy.cz/v1/rgeocode?${params}`);

  if (!response.ok) return null;
  const data = (await response.json()) as TRgeocodeResponse;
  const item = data.items?.[0];

  return item ?? null;
};

export { reverseGeocodeAddress };
