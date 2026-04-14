import React from "react";

import { Products } from "@/app/(web)/_components";
import { additionalsHelpers } from "@/helpers/additionals";
import { cartHelpers } from "@/helpers/cart";
import { useTranslation } from "@/hooks";
import { Container } from "@/ui";

import {
  Additionals,
  Client,
  Cutlery,
  Delivery,
  DeliveryType,
  Note,
  Placeholder,
  ProductsList,
  Queue,
  SectionLayout,
  Submit,
} from "./_components";

import { layoutClass, wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/cart">> = async () => {
  const [cart, additionals] = await Promise.all([
    cartHelpers.getCart(),
    additionalsHelpers.getAdditionals(),
  ]);
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
        products,
        totalPrice,
      } = cart;

      return (
        <>
          <SectionLayout
            heroChildren={<Queue />}
            title={t<string>("order")}
          >
            <ProductsList {...{ categoryDiscount, products }} />
          </SectionLayout>

          <div className={layoutClass}>
            <SectionLayout
              error={errors.cutlery}
              gridArea="cutlery"
              id="cart-cutlery"
              title={t<string>("cutleryQuantity")}
            >
              <Cutlery {...cutlery} />
            </SectionLayout>

            <SectionLayout
              error={errors.delivery}
              gridArea="delivery"
              title={t<string>("delivery")}
            >
              <DeliveryType
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

              <Delivery {...delivery} />
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
              <Note />
            </SectionLayout>

            <Submit {...{ totalPrice }} />
          </div>
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
