import React from "react";

import { store } from "@/store";

import { mapClass } from "./Map.css";

const Map: React.FC = async () => {
  const { mapUrl } = await store.shop.getSettings();

  if (!mapUrl) return null;

  return (
    <iframe
      allowFullScreen
      className={mapClass}
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl}
      title="Contacts map."
    />
  );
};

export { Map };
