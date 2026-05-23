import React, { Suspense } from "react";

import { Products } from "@/app/(web)/_components";
import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Container } from "@/ui";
import { isShopOpened } from "@/utils";

import {
  Additionals,
  Address,
  CartLayout,
  Client,
  Cutlery,
  Delivery,
  FormLayout,
  Note,
  Payment,
  Placeholder,
  Promo,
  PromoForm,
  Time,
  Queue,
  SectionLayout,
} from "./_components";
import { History } from "./_components/Client/History";

import "maplibre-gl/dist/maplibre-gl.css";
import { wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/cart">> = async () => {
  const [cart, additionals, settings, desktopLayout, mobileLayout] = await Promise.all([
    store.cart.get(),
    store.additionals.getAll(),
    store.shop.getSettings(),
    store.cartLayout.get(),
    store.cartLayout.getMobile(),
  ]);
  const { calculateGridAreas, calculateMobileOrder } = store.cartLayout;
  const gridTemplateAreas = calculateGridAreas(desktopLayout);
  const mobileOrder = calculateMobileOrder(mobileLayout);
  const { isAvailable, schedule } = settings;
  const shopIsOpen = isShopOpened(schedule, isAvailable);
  const { t } = useTranslation();

  const renderCart = (): null | React.ReactElement => {
    if (!shopIsOpen) return <Placeholder />;

    if (cart) {
      const {
        additionals: cartAdditionals,
        categoryDiscount,
        client,
        cutlery,
        delivery,
        errors,
        note,
        payment,
        products,
        promo,
        time,
        tips,
        totalPrice,
      } = cart;

      return (
        <>
          <PromoForm />

          <CartLayout
            {...{ categoryDiscount }}
            initialProducts={products}
            placeholder={<Placeholder />}
            productsTitle={t<string>("order")}
            queue={<Queue />}
          >
            <FormLayout {...{ errors, gridTemplateAreas }}>
              <SectionLayout
                gridArea="delivery"
                order={mobileOrder.delivery}
                title={t<string>("delivery")}
              >
                <Delivery
                  {...{ totalPrice }}
                  type={delivery.type}
                />

                <Time
                  {...{ schedule, time }}
                  deliveryType={delivery.type}
                />

                <Client
                  {...client}
                  errors={{
                    email: errors.email,
                    name: errors.name,
                    phone: errors.phone,
                  }}
                >
                  <Suspense>
                    <History phoneNumber={client.phoneNumber} />
                  </Suspense>
                </Client>

                <Address
                  {...{ delivery }}
                  addressError={errors.addressFormat ?? errors.addressRange}
                />
              </SectionLayout>

              <SectionLayout
                gridArea="cutlery"
                id="cart-cutlery"
                order={mobileOrder.cutlery}
                title={t<string>("cutleryQuantity")}
              >
                <Cutlery
                  {...cutlery}
                  isError={Boolean(errors.cutlery)}
                />
              </SectionLayout>

              <SectionLayout
                gridArea="additionals"
                order={mobileOrder.additionals}
                title={t<string>("addMore")}
              >
                <Additionals {...{ additionals, cartAdditionals }} />
              </SectionLayout>

              <SectionLayout
                gridArea="note"
                order={mobileOrder.note}
                title={t<string>("note")}
              >
                <Note defaultValue={note} />
              </SectionLayout>

              <SectionLayout
                gridArea="promo"
                order={mobileOrder.promo}
                title={t<string>("promoTitle")}
              >
                <Promo
                  {...{ delivery, promo }}
                  addressError={errors.addressFormat ?? errors.addressRange}
                  phoneError={errors.phone}
                  phoneNumber={client.phoneNumber}
                  promoError={errors.promo}
                />
              </SectionLayout>

              <SectionLayout
                gridArea="payment"
                order={mobileOrder.payment}
                title={t<string>("paymentMethods")}
              >
                <Payment
                  {...{ payment, tips, totalPrice }}
                  deliveryType={delivery.type}
                />
              </SectionLayout>
            </FormLayout>
          </CartLayout>
        </>
      );
    }

    return <Placeholder />;
  };

  return (
    <>
      <div className={wrapperClass}>
        <Container>{renderCart()}</Container>
      </div>

      <Products title="Chcete ještě něco přidat?" />
    </>
  );
};

export { metadata } from "./metadata";
export default Page;
