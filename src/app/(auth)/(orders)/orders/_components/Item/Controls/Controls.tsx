"use client";
import React, { useTransition } from "react";
import moment from "moment";

import { updateStatus } from "@/app/(auth)/(orders)/_actions";

import { buttonClass, layoutClass, statusClass } from "./Controls.css";

import type { TProps } from "./Controls.types";

const NEXT_STATUS: Record<TOrderStatus, null | TOrderStatus> = {
  done: null,
  new: "started",
  placed: null,
  ready: "took",
  started: "ready",
  took: "placed",
};

const BUTTON_LABEL: Record<TOrderStatus, string> = {
  done: "",
  new: "НАЧАТ",
  placed: "",
  ready: "ЗАБРАН",
  started: "ГОТОВ",
  took: "ОТДАН",
};

const Controls: React.FC<TProps> = ({ createdAt, deliveryTime, deliveryType, id, status }) => {
  const [isPending, startTransition] = useTransition();

  const minutesLate = deliveryTime
    ? moment(new Date()).diff(`${moment().format("YYYY-MM-DD")} ${deliveryTime}`, "m") + 60
    : moment(new Date()).diff(createdAt, "m");

  const getButtonLabel = (): string => {
    if (deliveryType === "pickup" && status === "ready") return "ОТДАН";

    return BUTTON_LABEL[status];
  };

  const getNextStatus = (): null | TOrderStatus => {
    if (deliveryType === "pickup" && status === "ready") return "placed";

    return NEXT_STATUS[status];
  };

  const getLateStatusCl = (): string => {
    if (minutesLate > 25 && minutesLate < 45) return "warning";
    if (minutesLate >= 45) return "alert";

    return "default";
  };

  const handleButtonClick = (): void => {
    const next = getNextStatus();

    if (!next) return;

    startTransition(async (): Promise<void> => {
      await updateStatus(id, next);
    });
  };

  const showControls = status !== "done" && status !== "placed";

  if (!showControls) return null;

  return (
    <div className={layoutClass}>
      <button
        className={`${buttonClass} ${status}`}
        disabled={isPending}
        onClick={handleButtonClick}
        type="button"
      >
        {getButtonLabel()}
      </button>

      {minutesLate > -1 && (
        <div className={`${statusClass} ${getLateStatusCl()}`}>{minutesLate}</div>
      )}
    </div>
  );
};

export { Controls };
