import { tool } from "ai";
import { object, string } from "zod";

import { getTranslation } from "@/dictionaries";
import { validateDeliveryAddress } from "@/utils";

const inputSchema = object({
  deliveryAddress: string().min(1).describe("Full delivery address to check"),
});

const checkDeliveryZone = tool({
  description: "Check whether a delivery address is within the delivery zone and return the price.",
  execute: async ({ deliveryAddress }) => {
    const apikey = process.env.MAPY_CZ_API_KEY ?? "";
    const params = new URLSearchParams({
      apikey,
      lang: "cs",
      limit: "1",
      locality: "Praha",
      query: deliveryAddress,
      type: "regional.address",
    });
    const geocodeResponse = await fetch(`https://api.mapy.cz/v1/suggest?${params}`);

    if (!geocodeResponse.ok) return "Nepodařilo se zjistit polohu adresy.";

    const geocodeData = (await geocodeResponse.json()) as { items: TAddressSuggestion[] };
    const position = geocodeData.items?.[0]?.position;

    if (!position) return "Adresa nebyla nalezena. Upřesněte prosím název ulice a číslo popisné.";

    const result = await validateDeliveryAddress(position);

    if (!result) return "Nepodařilo se vypočítat vzdálenost.";

    const { length, tier } = result;
    const km = Math.round((length / 1000) * 10) / 10;

    if (!tier) {
      return `Adresa je bohužel mimo rozsah rozvozu (vzdálenost ${km} km).`;
    }

    return `Adresa je v rozsahu rozvozu. Doprava: ${tier.title}, cena dopravy: ${tier.price} ${getTranslation("currency")} (vzdálenost ${km} km).`;
  },
  inputSchema,
});

export { checkDeliveryZone };
