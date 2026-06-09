import { store } from "@/store";

interface TMatrixResponse {
  matrix: [[{ duration: number; length: number }]];
}

interface TValidateDeliveryResult {
  length: number;
  tier?: TDeliveryCondition;
}

const kitchenCoords: TLatLon = { lat: 50.0861328, lon: 14.4518119 };

const validateDeliveryAddress = async ({
  lat,
  lon,
}: TLatLon): Promise<null | TValidateDeliveryResult> => {
  const apikey = process.env.MAPY_CZ_API_KEY ?? "";
  const matrixUrl = new URL("https://api.mapy.cz/v1/routing/matrix-m");

  matrixUrl.searchParams.set("apikey", apikey);
  matrixUrl.searchParams.set("lang", "cs");
  matrixUrl.searchParams.append("starts", `${kitchenCoords.lon},${kitchenCoords.lat}`);
  matrixUrl.searchParams.append("ends", [lon, lat].join(","));
  matrixUrl.searchParams.set("routeType", "car_fast_traffic");

  const matrixResponse = await fetch(matrixUrl.toString());

  if (!matrixResponse.ok) return null;

  const matrixData = (await matrixResponse.json()) as TMatrixResponse;
  const length = matrixData.matrix?.[0]?.[0]?.length ?? 0;

  const deliveryConditions = await store.deliveryConditions.getAll();
  const tier = deliveryConditions.find(
    ({ distanceFrom, distanceTo }) => distanceFrom < length && length <= distanceTo,
  );

  return { length, tier };
};

export { kitchenCoords, validateDeliveryAddress };
