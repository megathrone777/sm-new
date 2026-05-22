"use server";

interface TGpsWoxDevice {
  id: number;
  lat: null | number;
  lng: null | number;
  name: string;
  online: string;
}

interface TGpsWoxGroup {
  items: TGpsWoxDevice[];
}

const getCouriers = async (): Promise<TCourier[]> => {
  const params = new URLSearchParams({
    lang: "en",
    user_api_hash: process.env.GPS_WOX_API_HASH,
  });

  try {
    const response = await fetch(`${process.env.GPS_WOX_API_URL}/get_devices?${params}`, {
      cache: "no-store",
    });

    if (!response.ok) return [];
    const groups = (await response.json()) as TGpsWoxGroup[];

    return groups
      .flatMap((group: TGpsWoxGroup): TGpsWoxDevice[] => group.items ?? [])
      .filter(
        (device: TGpsWoxDevice): device is TGpsWoxDevice & { lat: number; lng: number } =>
          device.lat !== null && device.lng !== null,
      )
      .map(
        ({ id, lat, lng, name, online }): TCourier => ({
          id,
          latitude: lat,
          longitude: lng,
          name,
          online: online === "online",
        }),
      );
  } catch {
    return [];
  }
};

export { getCouriers };
