"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { kitchenCoords, validateDeliveryAddress } from "@/utils/validateDeliveryAddress";

import { saveCart } from "./saveCart";

type TRouteResponse = {
  geometry?: {
    geometry?: {
      coordinates?: [number, number][];
    };
  };
};

const selectDeliveryAddress = async (
  address: string,
  position: { lat: number; lng: number },
): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const apikey = process.env.MAPY_CZ_API_KEY ?? "";
  const pos = { lat: position.lat, lon: position.lng };

  const routeUrl = new URL("https://api.mapy.cz/v1/routing/route");

  routeUrl.searchParams.set("apikey", apikey);
  routeUrl.searchParams.set("lang", "cs");
  routeUrl.searchParams.set("start", `${kitchenCoords.lon},${kitchenCoords.lat}`);
  routeUrl.searchParams.set("end", `${pos.lon},${pos.lat}`);
  routeUrl.searchParams.set("routeType", "car_fast_traffic");

  const [result, routeResponse] = await Promise.all([
    validateDeliveryAddress(pos),
    fetch(routeUrl.toString()),
  ]);

  if (!result) return;

  const { length, tier } = result;

  const routeData = routeResponse.ok ? ((await routeResponse.json()) as TRouteResponse) : null;
  const routeCoordsLonLat = routeData?.geometry?.geometry?.coordinates ?? [];
  const route: [number, number][] =
    routeCoordsLonLat.length > 0
      ? routeCoordsLonLat.map(([lon, lat]) => [lat, lon])
      : [
          [kitchenCoords.lat, kitchenCoords.lon],
          [position.lat, position.lng],
        ];

  const { addressRange: _existing, ...errors } = cart.errors;
  const nextErrors = tier ? errors : { ...errors, addressRange: "Adresa mimo rozsah rozvozu" };

  await saveCart({
    delivery: {
      ...cart.delivery,
      address,
      distanceInM: length,
      position: route.length > 0 ? route : null,
      price: tier?.price ?? null,
      title: tier?.title ?? "",
    },
    errors: nextErrors,
  });

  revalidatePath("/cart");
};

export { selectDeliveryAddress };
