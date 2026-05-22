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
      .flatMap((group) => group.items ?? [])
      .filter((d): d is TGpsWoxDevice & { lat: number; lng: number } => d.lat !== null && d.lng !== null);

    const device = courierName
      ? devices.find((d) => d.name === courierName)
      : devices[0];

    if (!device) return null;

    return { latitude: device.lat, longitude: device.lng };
  } catch {
    return null;
  }
};

export { getCourierPosition };
