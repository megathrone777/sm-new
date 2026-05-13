import React from "react";
import Link from "next/link";

import { useTranslation } from "@/hooks";
import { Checkbox } from "@/ui";

import { Submit } from "./Submit";

import {
  agreeClass,
  agreeLabelClass,
  agreeLinkClass,
  changeClass,
  labelHolderClass,
  labelImageClass,
  layoutClass,
  rowClass,
} from "./Payment.css";

import type { TProps } from "./Payment.types";

const Payment: React.FC<TProps> = ({ deliveryType, payment, totalPrice }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={layoutClass}>
        <div className={rowClass}>
          <Checkbox
            defaultChecked={payment.type === "card"}
            label={t<string>("payByCard")}
            labelImage={
              <div className={labelHolderClass}>
                <img
                  alt="Apple pay"
                  className={labelImageClass}
                  src="/images/payments_img2.png"
                />

                <img
                  alt="Card"
                  className={labelImageClass}
                  src="/images/payments_img.png"
                />
              </div>
            }
            name="payment"
            type="radio"
            value="card"
          />
        </div>

        {deliveryType === "pickup" && (
          <div className={rowClass}>
            <Checkbox
              defaultChecked={payment.type === "cardAfterDelivery"}
              label={t<string>("payByCardPickup")}
              labelImage={
                <div className={labelHolderClass}>
                  <img
                    alt="Apple pay"
                    className={labelImageClass}
                    src="/images/payments_img2.png"
                  />

                  <img
                    alt="Card"
                    className={labelImageClass}
                    src="/images/payments_img.png"
                  />
                </div>
              }
              name="payment"
              type="radio"
              value="cardAfterDelivery"
            />
          </div>
        )}

        <div className={rowClass}>
          <Checkbox
            defaultChecked={payment.type === "cash"}
            label={t<string>("payByCash")}
            labelImage={
              <div className={labelHolderClass}>
                <img
                  alt="Cash"
                  className={labelImageClass}
                  src="/images/cash_img.jpg"
                />
              </div>
            }
            name="payment"
            type="radio"
            value="cash"
          />
        </div>

        {payment.type === "cash" && (
          <div
            className={changeClass}
            key={payment.change ?? "none"}
          >
            <div className={rowClass}>
              <Checkbox
                defaultChecked={payment.change === 2000}
                label={`Mám v hotovosti 2000 ${t<string>("currency")}`}
                name="change"
                type="radio"
                value={2000}
              />
            </div>

            <div className={rowClass}>
              <Checkbox
                defaultChecked={payment.change === 5000}
                label={`Mám v hotovosti 5000 ${t<string>("currency")}`}
                name="change"
                type="radio"
                value={5000}
              />
            </div>
          </div>
        )}
      </div>

      <div className={agreeClass}>
        <Checkbox
          defaultChecked
          disabled
          label={
            <span className={agreeLabelClass}>
              <span>
                Při pokračování v nákupu souhlasíte a potvrzujete, že jste se <br />
                seznámil s{" "}
              </span>

              <Link
                className={agreeLinkClass}
                href="/terms"
              >
                obchodními podmínkami
              </Link>
            </span>
          }
          type="checkbox"
        />
      </div>

      <Submit {...{ totalPrice }} />
    </>
  );
};

export { Payment };
