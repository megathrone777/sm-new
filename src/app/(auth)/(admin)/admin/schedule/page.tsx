import React from "react";

import { updateScheduleDay } from "@/app/(auth)/(admin)/_actions";
import { FormLayout, Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { WEEK_DAYS } from "@/store/shop";
import { Input } from "@/ui";

import { dayTitleClass, formClass, itemClass, listClass } from "./page.css";

const Page: React.FC = async () => {
  const { schedule } = await store.shop.getSettings();

  return (
    <>
      <Header title="Schedule" />

      <div className={listClass}>
        {WEEK_DAYS.map<React.ReactElement>((day: TWeekDay) => {
          const { closeTime, lastTimeForDelivery, openTime }: TScheduleDay = schedule[day];

          return (
            <div
              className={itemClass}
              key={`schedule-${day}`}
            >
              <p className={dayTitleClass}>{day}</p>

              <FormLayout
                formAction={updateScheduleDay}
                layoutClassName={formClass}
              >
                <input
                  name="day"
                  type="hidden"
                  value={day}
                />

                <Input
                  defaultValue={openTime}
                  label="Open time"
                  name="openTime"
                  type="time"
                />

                <Input
                  defaultValue={closeTime}
                  label="Close time"
                  name="closeTime"
                  type="time"
                />

                <Input
                  defaultValue={lastTimeForDelivery}
                  label="Last time for delivery"
                  name="lastTimeForDelivery"
                  type="time"
                />
              </FormLayout>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
