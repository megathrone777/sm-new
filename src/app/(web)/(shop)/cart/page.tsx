import React from "react";

import { Products } from "@/app/(web)/_components";
import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Container } from "@/ui";

import "leaflet/dist/leaflet.css";

import {
  Additionals,
  Address,
  CartShell,
  Client,
  Cutlery,
  Delivery,
  FormLayout,
  Note,
  Payment,
  Placeholder,
  Promo,
  Queue,
  SectionLayout,
} from "./_components";

import { wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/cart">> = async () => {
  const [cart, additionals] = await Promise.all([store.cart.get(), store.additionals.getAll()]);
  const { t } = useTranslation();

  const renderCart = (): null | React.ReactElement => {
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
        tips,
        totalPrice,
      } = cart;

      return (
        <CartShell
          {...{ categoryDiscount }}
          initialProducts={products}
          placeholder={<Placeholder />}
          productsTitle={t<string>("order")}
          queue={<Queue />}
        >
          <FormLayout {...{ errors }}>
            <SectionLayout
              gridArea="delivery"
              title={t<string>("delivery")}
            >
              <Delivery
                {...{ totalPrice }}
                type={delivery.type}
              />

              <Client
                {...client}
                errors={{
                  email: errors.email,
                  name: errors.name,
                  phone: errors.phone,
                }}
              />

              <Address
                {...{ delivery }}
                addressError={errors.addressFormat ?? errors.addressRange}
              />
            </SectionLayout>

            <SectionLayout
              gridArea="cutlery"
              id="cart-cutlery"
              title={t<string>("cutleryQuantity")}
            >
              <Cutlery
                {...cutlery}
                isError={Boolean(errors.cutlery)}
              />
            </SectionLayout>

            <SectionLayout
              gridArea="additionals"
              title={t<string>("addMore")}
            >
              <Additionals {...{ additionals, cartAdditionals }} />
            </SectionLayout>

            <SectionLayout
              gridArea="note"
              title={t<string>("note")}
            >
              <Note defaultValue={note} />
            </SectionLayout>

            <SectionLayout
              gridArea="promo"
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
              title={t<string>("paymentMethods")}
            >
              <Payment
                {...{ payment, tips, totalPrice }}
                deliveryType={delivery.type}
              />
            </SectionLayout>
          </FormLayout>
        </CartShell>
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
