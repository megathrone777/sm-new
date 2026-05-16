"use client";
import React, { startTransition, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

import { repeatOrder } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Button, Checkbox, Icon } from "@/ui";

import {
  actionsClass,
  controlsClass,
  copyButtonClass,
  dateClass,
  iconClass,
  imageClass,
  imageWrapperClass,
  imagesClass,
  invoiceAreaClass,
  invoiceLinkClass,
  listClass,
  moreImagesClass,
  orderIdClass,
  priceClass,
  // repeatClass,
  rowClass,
  statusClass,
} from "./OrdersClient.css";

import type { TArchivedOrder, TProps } from "./OrdersClient.types";

const MAX_IMAGES = 3;

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(iso));

const getStatusKey = ({
  onlinePaymentStatus,
  paymentType,
  status,
}: TArchivedOrder): "cancelled" | "done" | "processing" => {
  if (onlinePaymentStatus === "CANCELLED") return "cancelled";

  if (status === "done") return "done";

  if (
    status === "placed" &&
    (paymentType === "cash" ||
      paymentType === "cardAfterDelivery" ||
      (paymentType === "card" && onlinePaymentStatus === "PAID"))
  )
    return "done";

  return "processing";
};

const STATUS_LABELS: Record<"cancelled" | "done" | "processing", string> = {
  cancelled: "Zrušena",
  done: "Vyřízena",
  processing: "Vyřizuje se",
};

const OrdersClient: React.FC<TProps> = ({ orders }) => {
  const { t } = useTranslation();
  const [hideCancelled, setHideCancelled] = useState(false);
  const [repeatingId, setRepeatingId] = useState<null | number>(null);
  const visible = hideCancelled ? orders.filter((o) => getStatusKey(o) !== "cancelled") : orders;

  const handleCopyClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const { value } = currentTarget;

    navigator.clipboard.writeText(`${value}`).catch(() => null);
    toast("Číslo objednávky zkopírováno", { type: "success" });
  };

  const handleCancelledChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    setHideCancelled(currentTarget.checked);
  };

  const handleRepeatClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const { value } = currentTarget;
    const orderId = +value;

    setRepeatingId(orderId);
    startTransition(async () => {
      const { message, type } = await repeatOrder(orderId);

      toast(message, { type });
      setRepeatingId(null);
    });
  };

  return (
    <div>
      <div className={controlsClass}>
        <Checkbox
          checked={hideCancelled}
          label="Skrýt zrušené"
          name="hideCancelled"
          onChange={handleCancelledChange}
          type="checkbox"
        />
      </div>

      <div className={listClass}>
        {visible.map<React.ReactElement>((order: TArchivedOrder) => {
          const statusKey = getStatusKey(order);
          const { canRepeat, createdAt, hasInvoice, id, products, totalPrice } = order;
          const images = products
            .filter(({ imageUrl }: TOrderProduct) => imageUrl)
            .slice(0, MAX_IMAGES + 1);
          const visibleImages = images.slice(0, MAX_IMAGES);
          const extraCount = images.length > MAX_IMAGES ? images.length - MAX_IMAGES : 0;

          return (
            <div
              className={rowClass}
              key={`order-${id}`}
            >
              <span className={dateClass}>{formatDate(createdAt)}</span>

              <span className={orderIdClass}>
                <button
                  className={copyButtonClass}
                  onClick={handleCopyClick}
                  title="Kopírovat číslo objednávky"
                  type="button"
                  value={id}
                >
                  <Icon
                    className={iconClass}
                    id="copy"
                  />
                </button>

                <span>#{id}</span>
              </span>

              <span className={priceClass}>
                {totalPrice} {t<string>("currency")}
              </span>

              <span className={statusClass[statusKey]}>{STATUS_LABELS[statusKey]}</span>

              <div className={invoiceAreaClass}>
                {hasInvoice && (
                  <Link
                    className={invoiceLinkClass}
                    href={`/invoice/${id}` as __next_route_internal_types__.RouteImpl<string>}
                    target="_blank"
                  >
                    <Icon
                      className={iconClass}
                      id="invoice"
                    />

                    <span>Faktura {id}</span>
                  </Link>
                )}
              </div>

              <div className={actionsClass}>
                {canRepeat && (
                  <Button
                    disabled={repeatingId === id}
                    onClick={handleRepeatClick}
                    template="small"
                    title="Zopakovat"
                    value={id}
                  >
                    <span>
                      {repeatingId === id ? (
                        "..."
                      ) : (
                        <Icon
                          className={iconClass}
                          id="repeat"
                        />
                      )}
                    </span>
                  </Button>
                )}
              </div>

              <div className={imagesClass}>
                {visibleImages.map<React.ReactElement>(({ id: productId, imageUrl, title }) => (
                  <div
                    className={imageWrapperClass}
                    key={`img-${id}-${productId}`}
                  >
                    <Image
                      alt={title}
                      className={imageClass}
                      fill
                      sizes="44px"
                      src={imageUrl}
                    />
                  </div>
                ))}

                {extraCount > 0 && <span className={moreImagesClass}>+{extraCount}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { OrdersClient };
