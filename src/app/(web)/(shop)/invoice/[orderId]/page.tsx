import React from "react";
import { notFound } from "next/navigation";

import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Container } from "@/ui";

import { PrintBar, PrintTrigger } from "./_components";

import {
  footerClass,
  headerClass,
  invoiceSubtitleClass,
  invoiceTitleClass,
  labelClass,
  metaGridClass,
  metaKeyClass,
  pageClass,
  partyClass,
  partyGridClass,
  printBarClass,
  tableClass,
  tdClass,
  tdRightClass,
  thClass,
  thRightClass,
  theadClass,
  totalAmountClass,
  totalLabelClass,
  totalRowClass,
} from "./page.css";

const PAYMENT_LABELS: Record<TPaymentType, string> = {
  card: "Kartou on-line",
  cardAfterDelivery: "Kartou na místě",
  cash: "Hotovost",
};

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(iso));

const Page: React.FC<PageProps<"/invoice/[orderId]">> = async ({ params }) => {
  const { t } = useTranslation();
  const { orderId } = await params;
  const [order, settings] = await Promise.all([
    store.orders.getById(+orderId),
    store.shop.getSettings(),
  ]);

  if (!order) return notFound();

  const {
    additionals,
    clientEmail,
    clientName,
    clientPhoneNumber,
    createdAt,
    deliveryAddress,
    deliveryPrice,
    deliveryType,
    id,
    paymentType,
    products,
    totalPrice,
  } = order;
  const dateStr = formatDate(createdAt);

  return (
    <Container>
      <div className={pageClass}>
        <PrintTrigger />
        <PrintBar className={printBarClass} />

        <div className={headerClass}>
          <div>
            <div className={labelClass}>{settings?.businessName ?? "Sushi-man"}</div>
            {settings?.address && <div>{settings.address}</div>}
            {settings?.companyDetails && <div>{settings.companyDetails}</div>}
            {settings?.phone && <div>Tel: {settings.phone}</div>}
            {settings?.email && <div>E-mail: {settings.email}</div>}
          </div>

          <div>
            <div className={invoiceTitleClass}>Faktura – Daňový doklad – {id}</div>
            <div className={invoiceSubtitleClass}>záruční a dodací list</div>
          </div>
        </div>

        <div className={partyGridClass}>
          <div>
            <div className={labelClass}>Prodávající:</div>
            <div className={partyClass}>
              <div>{settings?.businessName ?? "Sushi-man"}</div>
              {settings?.address && <div>{settings.address}</div>}
            </div>
          </div>

          <div>
            <div className={labelClass}>Kupující:</div>
            <div className={partyClass}>
              <div>{clientName}</div>
              {deliveryType === "delivery" && deliveryAddress && <div>{deliveryAddress}</div>}
              {clientEmail && <div>E-mail: {clientEmail}</div>}
              <div>Tel: +{clientPhoneNumber}</div>
            </div>
          </div>
        </div>

        <div className={metaGridClass}>
          <div>
            <div>
              <span className={metaKeyClass}>Daňový doklad:</span>
              Faktura
            </div>
            <div>
              <span className={metaKeyClass}>Datum vystavení:</span>
              {dateStr}
            </div>
            <div>
              <span className={metaKeyClass}>Datum splatnosti:</span>
              {dateStr}
            </div>
          </div>

          <div>
            <div>
              <span className={metaKeyClass}>Způsob úhrady:</span>
              {PAYMENT_LABELS[paymentType]}
            </div>
            <div>
              <span className={metaKeyClass}>Způsob doručení:</span>
              {deliveryType === "pickup" ? "Vyzvednutí" : "Kurýr"}
            </div>
          </div>
        </div>

        <table className={tableClass}>
          <thead className={theadClass}>
            <tr>
              <th className={thClass}>Popis</th>
              <th className={thRightClass}>Ks</th>
              <th className={thRightClass}>Cena / ks</th>
              <th className={thRightClass}>Celkem</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={`product-${p.id}`}>
                <td className={tdClass}>
                  {p.title}
                  {p.weight ? ` (${p.weight})` : ""}
                  {p.modifiers.map((m) => (
                    <div
                      key={m.id}
                      style={{ color: "#777", fontSize: 10 }}
                    >
                      + {m.title}
                      {m.subModifier ? ` – ${m.subModifier.title}` : ""}
                    </div>
                  ))}
                </td>

                <td className={tdRightClass}>{p.quantity}</td>

                <td className={tdRightClass}>
                  {(p.totalPrice / p.quantity).toFixed(0)} {t<string>("currency")}
                </td>

                <td className={tdRightClass}>
                  {p.totalPrice} {t<string>("currency")}
                </td>
              </tr>
            ))}

            {additionals.map<React.ReactElement>((a) => (
              <tr key={`additional-${a.id}`}>
                <td className={tdClass}>{a.title}</td>
                <td className={tdRightClass}>{a.quantity}</td>

                <td className={tdRightClass}>
                  {a.price} {t<string>("currency")}
                </td>

                <td className={tdRightClass}>
                  {a.totalPrice} {t<string>("currency")}
                </td>
              </tr>
            ))}

            {deliveryPrice > 0 && (
              <tr>
                <td className={tdClass}>Doručení</td>
                <td className={tdRightClass}>1</td>

                <td className={tdRightClass}>
                  {deliveryPrice} {t<string>("currency")}
                </td>

                <td className={tdRightClass}>
                  {deliveryPrice} {t<string>("currency")}
                </td>
              </tr>
            )}

            <tr className={totalRowClass}>
              <td
                className={totalLabelClass}
                colSpan={3}
              >
                Celkem:
              </td>

              <td className={totalAmountClass}>
                {totalPrice} {t<string>("currency")}
              </td>
            </tr>
          </tbody>
        </table>

        <div className={footerClass}>Děkujeme za Vaši objednávku.</div>
      </div>
    </Container>
  );
};

export default Page;
