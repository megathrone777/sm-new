import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getTranslation } from "@/dictionaries";
import { store } from "@/store";
import { Button, Container, Icon } from "@/ui";

import { Additionals, Footer, Products, Progress } from "./_components";

import {
  columnClass,
  contentClass,
  descriptionClass,
  iconClass,
  imageClass,
  imageHolderClass,
  itemClass,
  itemLinkClass,
  layoutClass,
  labelClass,
  linkClass,
  subitemClass,
  subtitleClass,
  titleClass,
  valueClass,
  wrapperClass,
} from "./page.css";

const Page: React.FC<PageProps<"/order-confirmed/[id]">> = async ({ params }) => {
  const { id } = await params;
  const order = await store.orders.getById(+id);

  if (order) {
    const {
      additionals,
      clientPhoneNumber,
      courier,
      cutleryCount,
      deliveryAddress,
      deliveryCoordinates,
      deliveryTime,
      deliveryType,
      id: orderId,
      note,
      paymentType,
      products,
      promocode,
      promocodeDiscountPrice,
      status,
      tipsAmount,
      tipsPrice,
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
                Vážený zákazníků prosím Vás zkontrolovat že jste správně ukázal Telefoní číslo! Na
                které dostanete informační SMS o Vaše objednávce.
              </p>

              <p className={subitemClass}>
                <span className={labelClass}>Objednávka:</span>
                <span className={valueClass}>#{id}</span>
              </p>

              {products && !!products.length && <Products {...{ products }} />}
              {additionals && !!additionals.length && <Additionals {...{ additionals }} />}

              <p className={itemClass}>
                <span className={labelClass}>Příbory:</span>
                <span className={valueClass}>{cutleryCount}</span>
              </p>

              <p className={itemClass}>
                <span className={labelClass}>Způsob platby:</span>

                <span className={valueClass}>
                  {paymentType === "cash"
                    ? "Hotovost"
                    : paymentType === "card"
                      ? "Kartou on-line"
                      : "Kartou na místě"}
                </span>
              </p>

              <p className={itemClass}>
                <span className={labelClass}>Doprava:</span>

                <span className={valueClass}>
                  {deliveryType === "pickup" ? "Vyzvednutí" : "Kurýr"}
                </span>
              </p>

              {deliveryType === "pickup" && (
                <p className={itemClass}>
                  <span className={labelClass}>Adresa vyzvednutí:</span>
                  <span className={valueClass}>Milíčova 471/25, Praha 3</span>
                </p>
              )}

              {deliveryType === "delivery" && (
                <p className={itemClass}>
                  <span className={labelClass}>Adresa doručení:</span>

                  <span className={valueClass}>
                    <a
                      className={itemLinkClass}
                      href={`https://maps.google.com/?q=${encodeURIComponent(deliveryAddress)}`}
                      target="_blank"
                    >
                      {deliveryAddress}
                    </a>
                  </span>
                </p>
              )}

              <p className={itemClass}>
                <span className={labelClass}>Telefon:</span>

                <span className={valueClass}>
                  <a
                    className={itemLinkClass}
                    href={`tel:+${clientPhoneNumber}`}
                  >
                    +{clientPhoneNumber}
                  </a>
                </span>
              </p>

              {deliveryType === "delivery" ? (
                <>
                  {deliveryTime ? (
                    <p className={itemClass}>
                      <span className={labelClass}>Doručit v:</span>
                      <span className={valueClass}>{deliveryTime}</span>
                    </p>
                  ) : (
                    <p className={itemClass}>
                      <span className={labelClass}>Doručit v:</span>
                      <span className={valueClass}>teď</span>
                    </p>
                  )}
                </>
              ) : (
                <>
                  {deliveryTime ? (
                    <p className={itemClass}>
                      <span className={labelClass}>Čas vyzvednutí:</span>
                      <span className={valueClass}>{deliveryTime}</span>
                    </p>
                  ) : (
                    <p className={itemClass}>
                      <span className={labelClass}>Čas vyzvednutí:</span>
                      <span className={valueClass}>teď</span>
                    </p>
                  )}
                </>
              )}

              {note && (
                <p className={itemClass}>
                  <span className={labelClass}>Poznámka:</span>
                  <span className={valueClass}>{note}</span>
                </p>
              )}

              {promocode && (
                <p className={itemClass}>
                  <span className={labelClass}>Promo:</span>

                  <span className={valueClass}>
                    {promocode} ({promocodeDiscountPrice} {getTranslation<string>("currency")})
                  </span>
                </p>
              )}

              {tipsPrice && tipsPrice > 0 ? (
                <p className={itemClass}>
                  <span className={labelClass}>Tips:</span>

                  <span className={valueClass}>
                    {tipsPrice} {getTranslation<string>("currency")} ({tipsAmount}%)
                  </span>
                </p>
              ) : null}

              <p className={itemClass}>
                <span className={labelClass}>Cena:</span>

                <span className={valueClass}>
                  {totalPrice} {getTranslation<string>("currency")}
                </span>
              </p>

              {deliveryType === "delivery" && (
                <Progress
                  {...{ courier, deliveryCoordinates, orderId }}
                  initialStatus={status}
                />
              )}
            </div>

            <div className={contentClass}>
              <div className={imageHolderClass}>
                <Image
                  alt="Order confirmed."
                  className={imageClass}
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
                <h3 className={subtitleClass}>Přihlaste se k odběru našeho Instagramu</h3>

                <Button
                  href="https://www.instagram.com/sushiman_prague/"
                  target="_blank"
                >
                  Otevřit Instagram
                </Button>

                <div className={imageHolderClass}>
                  <a
                    className={linkClass}
                    href="https://www.instagram.com/sushiman_prague/"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <img
                      alt="Sushi-man instagram."
                      className={imageClass}
                      src="/images/instagram_img.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </Container>
      </div>
    );
  }

  return notFound();
};

export default Page;
