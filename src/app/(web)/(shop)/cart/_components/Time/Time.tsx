"use client";
import React, { startTransition } from "react";

import { updateDeliveryTime } from "@/app/(web)/_actions";
import { Icon, Selectbox } from "@/ui";

import { iconClass, labelClass, wrapperClass } from "./Time.css";

import type { TProps } from "./Time.types";

const SLOT_INTERVAL_MINUTES = 30;
const SLOT_END_OFFSET_MINUTES = 30;
const MIN_LEAD_MINUTES = 60;

const WEEKDAY_LOOKUP: TWeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const toHHMM = (date: Date): string =>
  `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

const parseHHMM = (time: string): Date => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date;
};

const generateOptions = ({ closeTime, openTime }: TScheduleDay): string[] => {
  const earliest = new Date(Date.now() + MIN_LEAD_MINUTES * 60 * 1000);
  const open = parseHHMM(openTime);
  const lastSlot = parseHHMM(closeTime);

  lastSlot.setMinutes(lastSlot.getMinutes() - SLOT_END_OFFSET_MINUTES);

  const remainder = earliest.getMinutes() % SLOT_INTERVAL_MINUTES;

  if (remainder !== 0)
    earliest.setMinutes(earliest.getMinutes() + (SLOT_INTERVAL_MINUTES - remainder));
  earliest.setSeconds(0, 0);

  const cursor = new Date(earliest > open ? earliest : open);
  const options: string[] = [];

  while (cursor <= lastSlot) {
    options.push(toHHMM(cursor));
    cursor.setMinutes(cursor.getMinutes() + SLOT_INTERVAL_MINUTES);
  }

  return options;
};

const Time: React.FC<TProps> = ({ deliveryType, schedule, time }) => {
  const getLabel = (): string => {
    if (deliveryType === "delivery") {
      return time.value ? `Doručit v ${time.value}` : "Doručit teď";
    }

    return time.value ? `Vyzvednout v ${time.value}` : "Vyzvednout teď";
  };

  const handleChange = (selected: unknown): void => {
    const value = typeof selected === "string" ? selected : "";
    const formData = new FormData();

    formData.set("time", value);

    startTransition((): void => {
      updateDeliveryTime(formData);
    });
  };

  const resetLabel = deliveryType === "delivery" ? "Doručit teď" : "Vyzvednout teď";

  const getOptions = (): TSelectOption[] => {
    const today = WEEKDAY_LOOKUP[new Date().getDay()] ?? "monday";
    const daySchedule = schedule[today as TWeekDay];
    const slots = generateOptions(daySchedule).map<TSelectOption>((slot: string) => ({
      label: slot,
      value: slot,
    }));

    return [{ label: resetLabel, value: "" }, ...slots];
  };

  if (getOptions().length > 1) {
    return (
      <div className={wrapperClass}>
        <label
          className={labelClass}
          htmlFor="time"
        >
          <Icon
            className={iconClass}
            id="time"
          />

          <span>{getLabel()}</span>
        </label>

        <Selectbox
          defaultValue={time.value ?? ""}
          id="time"
          onChange={handleChange}
          options={getOptions()}
          placeholder={getLabel()}
        />
      </div>
    );
  }

  return null;
};

export { Time };
