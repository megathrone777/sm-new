"use client";
import React, { startTransition, useMemo } from "react";
import moment from "moment";

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

const generateOptions = (day: TScheduleDay): string[] => {
  const earliest = moment().add(MIN_LEAD_MINUTES, "minutes");
  const open = moment(day.openTime, "HH:mm");
  const lastSlot = moment(day.closeTime, "HH:mm").subtract(SLOT_END_OFFSET_MINUTES, "minutes");
  const remainder = earliest.minute() % SLOT_INTERVAL_MINUTES;
  const snappedEarliest =
    remainder === 0
      ? earliest.clone().seconds(0).milliseconds(0)
      : earliest
          .clone()
          .add(SLOT_INTERVAL_MINUTES - remainder, "minutes")
          .seconds(0)
          .milliseconds(0);
  const cursor = snappedEarliest.isAfter(open) ? snappedEarliest : open;
  const options: string[] = [];

  while (!cursor.isAfter(lastSlot)) {
    options.push(cursor.format("HH:mm"));
    cursor.add(SLOT_INTERVAL_MINUTES, "minutes");
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

  const options = useMemo((): TSelectOption[] => {
    const today = WEEKDAY_LOOKUP[new Date().getDay()] ?? "monday";
    const daySchedule = schedule[today as TWeekDay];
    const slots = generateOptions(daySchedule).map<TSelectOption>((slot: string) => ({
      label: slot,
      value: slot,
    }));

    return [{ label: resetLabel, value: "" }, ...slots];
  }, [resetLabel, schedule]);

  if (options.length > 1) {
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
          {...{ options }}
          defaultValue={time.value ?? ""}
          id="time"
          onChange={handleChange}
          placeholder={getLabel()}
        />
      </div>
    );
  }

  return null;
};

export { Time };
