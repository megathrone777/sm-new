import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/app/(web)/_actions", () => ({
  updateDeliveryTime: jest.fn(),
}));

jest.mock("@/ui", () => ({
  Icon: ({ id }: { id: string }): React.ReactElement => <span data-testid={`icon-${id}`} />,
  Selectbox: ({
    defaultValue,
    id,
    onChange,
    options,
    placeholder,
  }: {
    defaultValue?: string;
    id?: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
  }): React.ReactElement => (
    <select
      {...{ defaultValue, id }}
      aria-label={placeholder}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("./Time.css", () => ({
  iconClass: "",
  labelClass: "",
  wrapperClass: "",
}));

import { updateDeliveryTime } from "@/app/(web)/_actions";

import { Time } from "../Time";

const openSchedule: TSchedule = ((): TSchedule => {
  const day: TScheduleDay = { closeTime: "23:30", lastTimeForDelivery: "23:00", openTime: "00:00" };

  return {
    friday: day,
    monday: day,
    saturday: day,
    sunday: day,
    thursday: day,
    tuesday: day,
    wednesday: day,
  };
})();

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2026-05-14T12:00:00"));
});

afterAll(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Time", () => {
  describe("label display — delivery", () => {
    it("shows 'Doručit teď' when no delivery time is selected", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      expect(screen.getByText("Doručit teď", { selector: "span" })).toBeInTheDocument();
    });

    it("shows 'Doručit v HH:mm' when a delivery time is selected", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "14:00", value: "14:00" }}
        />,
      );

      expect(screen.getByText("Doručit v 14:00")).toBeInTheDocument();
    });
  });

  describe("label display — pickup", () => {
    it("shows 'Vyzvednout teď' when no pickup time is selected", () => {
      render(
        <Time
          deliveryType="pickup"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      expect(screen.getByText("Vyzvednout teď", { selector: "span" })).toBeInTheDocument();
    });

    it("shows 'Vyzvednout v HH:mm' when a pickup time is selected", () => {
      render(
        <Time
          deliveryType="pickup"
          schedule={openSchedule}
          time={{ label: "16:30", value: "16:30" }}
        />,
      );

      expect(screen.getByText("Vyzvednout v 16:30")).toBeInTheDocument();
    });
  });

  describe("selectbox", () => {
    it("renders the time selectbox", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("the first option is always the 'now' reset option with empty value", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      const options = screen.getAllByRole("option");

      expect(options[0]).toHaveValue("");
    });

    it("shows the time icon", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      expect(screen.getByTestId("icon-time")).toBeInTheDocument();
    });

    it("calls updateDeliveryTime when a time slot is chosen", () => {
      render(
        <Time
          deliveryType="delivery"
          schedule={openSchedule}
          time={{ label: "", value: null }}
        />,
      );

      const select = screen.getByRole("combobox");
      const firstSlot = select.querySelectorAll("option")[1];

      if (firstSlot) {
        fireEvent.change(select, { target: { value: firstSlot.value } });
      }

      expect(updateDeliveryTime).toHaveBeenCalled();
    });
  });
});
