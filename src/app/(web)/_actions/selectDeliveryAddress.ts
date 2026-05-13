"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

type TMatrixResponse = {
  matrix: [[{ duration: number; length: number }]];
};

type TRouteResponse = {
  geometry?: {
    geometry?: {
      coordinates?: [number, number][];
    };
  };
};

const KITCHEN_LON_LAT: [number, number] = [14.4518119, 50.0861328];

const selectDeliveryAddress = async (
  address: string,
  position: { lat: number; lng: number },
): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const apikey = process.env.APP_MAPY_CZ_API_KEY ?? "";
  const clientLonLat: [number, number] = [position.lng, position.lat];
  const deliveryConditions = await store.deliveryConditions.getAll();

  const matrixUrl = new URL("https://api.mapy.cz/v1/routing/matrix-m");

  matrixUrl.searchParams.set("apikey", apikey);
  matrixUrl.searchParams.set("lang", "cs");
  matrixUrl.searchParams.append("starts", KITCHEN_LON_LAT.join(","));
  matrixUrl.searchParams.append("ends", clientLonLat.join(","));
  matrixUrl.searchParams.set("routeType", "car_fast_traffic");

  const routeUrl = new URL("https://api.mapy.cz/v1/routing/route");

  routeUrl.searchParams.set("apikey", apikey);
  routeUrl.searchParams.set("lang", "cs");
  routeUrl.searchParams.set("start", KITCHEN_LON_LAT.join(","));
  routeUrl.searchParams.set("end", clientLonLat.join(","));
  routeUrl.searchParams.set("routeType", "car_fast_traffic");

  const [matrixResponse, routeResponse] = await Promise.all([
    fetch(matrixUrl.toString()),
    fetch(routeUrl.toString()),
  ]);

  if (!matrixResponse.ok) return;

  const matrixData = (await matrixResponse.json()) as TMatrixResponse;
  const length = matrixData.matrix?.[0]?.[0]?.length ?? 0;

  const routeData = routeResponse.ok ? ((await routeResponse.json()) as TRouteResponse) : null;
  const routeCoordsLonLat = routeData?.geometry?.geometry?.coordinates ?? [];
  const route: [number, number][] =
    routeCoordsLonLat.length > 0
      ? routeCoordsLonLat.map(([lon, lat]) => [lat, lon])
      : [
          [KITCHEN_LON_LAT[1], KITCHEN_LON_LAT[0]],
          [position.lat, position.lng],
        ];

  const tier = deliveryConditions.find(
    ({ distanceFrom, distanceTo }) => distanceFrom < length && length <= distanceTo,
  );

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
