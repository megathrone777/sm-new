"use server";

interface TGpsWoxDevice {
  id: number;
  lat: null | number;
  lng: null | number;
  name: string;
}

interface TGpsWoxGroup {
  items: TGpsWoxDevice[];
}

const getCourierPosition = async (
  courierName: string,
): Promise<{ latitude: number; longitude: number } | null> => {
  const params = new URLSearchParams({
    lang: "en",
    user_api_hash: process.env.GPS_WOX_API_HASH!,
  });

  try {
    const response = await fetch(`${process.env.GPS_WOX_API_URL}/get_devices?${params}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const groups = (await response.json()) as TGpsWoxGroup[];
    const devices = groups
      .flatMap(({ items }) => items ?? [])
      .filter(
        (device: TGpsWoxDevice): device is TGpsWoxDevice & { lat: number; lng: number } =>
          device.lat !== null && device.lng !== null,
      );
    const device = courierName ? devices.find((d) => d.name === courierName) : devices[0];

    if (!device) return null;
    const { lat, lng } = device;

    return { latitude: lat, longitude: lng };
  } catch {
    return null;
  }
};

export { getCourierPosition };
