const earthRadius: number = 6371000;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const geoDistance = (
  from: Pick<TCourier, "latitude" | "longitude">,
  to: Pick<TCourier, "latitude" | "longitude">
): number => {
  const deltaLatitude = toRadians(to.latitude - from.latitude);
  const deltaLongitude = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);
  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(fromLatitude) * Math.cos(toLatitude) * Math.sin(deltaLongitude / 2) ** 2;

  return 2 * earthRadius * Math.asin(Math.min(1, Math.sqrt(a)));
};

export { geoDistance };
