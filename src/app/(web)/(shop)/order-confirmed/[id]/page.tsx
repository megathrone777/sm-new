import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Button, Container, Icon } from "@/ui";

import { Additionals, Products } from "./_components";

import {
  columnClass,
  contentClass,
  descriptionClass,
  footerClass,
  iconClass,
  imageHolderClass,
  itemClass,
  layoutClass,
  subitemClass,
  titleClass,
  wrapperClass,
} from "./page.css";

const Page: React.FC<PageProps<"/order-confirmed/[id]">> = async ({ params }) => {
  const { t } = useTranslation();
  const { id } = await params;
  const order = await store.orders.getById(+id);

  // useEffect((): VoidFunction => {
  //   const fbEventData: TFacebookData = {
  //     content_ids: items.map(
  //       (item: {
  //         product: {
  //           id: string;
  //         };
  //       }) => item.product.id,
  //     ),
  //     content_type: "product",
  //     currency: "CZK",
  //     value: totalAmountCZK,
  //   };

  //   if (window.fbq) {
  //     window.fbq("track", "Purchase", fbEventData);
  //   }
  // }, []);

  if (order) {
    const {
      additionals,
      clientPhoneNumber,
      cutleryCount,
      deliveryAddress,
      deliveryTime,
      deliveryType,
      note,
      paymentType,
      products,
      totalPrice,
    } = order;

    return (
      <div className={wrapperClass}>
        <Container>
          <h2 className={titleClass}>Vaše objednávka byla úspěšně přijata</h2>

          <div className={layoutClass}>
            <div className={contentClass}>
              <p className={descriptionClass}>
                <Icon
                  className={iconClass}
                  id="exclamation"
                />

                {t<string>("orderConfirmed")}
              </p>

              <p className={subitemClass}>
                <b>Objednávka: </b>#{id}
              </p>

              {products && !!products.length && <Products {...{ products }} />}
              {additionals && !!additionals.length && <Additionals {...{ additionals }} />}

              <p className={itemClass}>
                <b>Příbory: </b>
                {cutleryCount}
              </p>

              <p className={itemClass}>
                <b>Způsob platby: </b>

                {paymentType === "cash"
                  ? "Hotovost"
                  : paymentType === "card"
                    ? "Kartou on-line"
                    : "Kartou na místě"}
              </p>

              <p className={itemClass}>
                <b>Doprava: </b>
                {deliveryType === "pickup" ? "Vyzvednutí" : "Kurýr"}
              </p>

              {deliveryType === "pickup" && (
                <p className={itemClass}>
                  <b>Adresa vyzvednutí: </b>
                  Milíčova 471/25, Praha 3
                </p>
              )}

              {deliveryType === "delivery" && (
                <p className={itemClass}>
                  <b>Adresa doručení:</b> {deliveryAddress}
                </p>
              )}

              <p className={itemClass}>
                <b>Telefon: </b>+{clientPhoneNumber}
              </p>

              {deliveryType === "delivery" ? (
                <>
                  {deliveryTime ? (
                    <p className={itemClass}>
                      <b>Doručit v:</b> {deliveryTime}
                    </p>
                  ) : (
                    <p className={itemClass}>
                      <b>Doručit v:</b> teď
                    </p>
                  )}
                </>
              ) : (
                <>
                  {deliveryTime ? (
                    <p className={itemClass}>
                      <b>Čas vyzvednutí:</b> {deliveryTime}
                    </p>
                  ) : (
                    <p className={itemClass}>
                      <b>Čas vyzvednutí:</b> teď
                    </p>
                  )}
                </>
              )}

              {note && (
                <p className={itemClass}>
                  <b>Poznámka:</b> {note}
                </p>
              )}

              <p className={itemClass}>
                <b>Cena: </b>
                {totalPrice} {t<string>("currency")}
              </p>
            </div>

            <div className={contentClass}>
              <div className={imageHolderClass}>
                <Image
                  alt="Order confirmed."
                  height={0}
                  priority
                  sizes="100vw"
                  src="/images/success_img.png"
                  width={0}
                />
              </div>
            </div>

            <div className={contentClass}>
              <div className={columnClass}>
                <h3>Přihlaste se k odběru našeho Instagramu</h3>

                <Button
                  href="https://www.instagram.com/sushiman_prague/"
                  target="_blank"
                >
                  Otevřit Instagram
                </Button>

                <div className={imageHolderClass}>
                  <a
                    href="https://www.instagram.com/sushiman_prague/"
                    target="_blank"
                  >
                    <img
                      alt="Sushi-man instagram."
                      src="/images/instagram_img.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={footerClass}>
            <Button href="/">Hlavní stránka</Button>
          </div>
        </Container>
      </div>
    );
  }

  return notFound();
};

export default Page;
