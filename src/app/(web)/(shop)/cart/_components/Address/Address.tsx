"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useTranslation } from "@/hooks";
import { Icon } from "@/ui";

import { Search } from "./Search";

import { addressClass, cityClass, iconClass, linkClass, wrapperClass } from "./Address.css";

import type { TProps } from "./Address.types";

const MapLayout = dynamic(() => import("./MapLayout").then(({ MapLayout }) => MapLayout), {
  ssr: false,
});

const Map = dynamic(() => import("./Map").then(({ Map }) => Map), {
  ssr: false,
});

const Address: React.FC<TProps> = ({ addressError, delivery }) => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      {delivery.type === "delivery" && <Search {...{ addressError, delivery }} />}

      <MapLayout {...{ delivery }}>
        <Map {...{ delivery }} />
      </MapLayout>

      {delivery.type === "pickup" && (
        <p className={addressClass}>
          <Icon
            className={iconClass}
            id="address"
          />

          <span>{t<string>("pickupAddress")}: </span>

          <Link
            className={linkClass}
            href="https://maps.app.goo.gl/Fw2hbzivdMifDs9c8"
            target="_blank"
          >
            Milíčova 471/25, <span className={cityClass}>Praha 3</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export { Address };
