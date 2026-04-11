import React from "react";

import { Products } from "@/app/(web)/_components";
import { additionalsHelpers } from "@/helpers/additionals";
import { cartHelpers } from "@/helpers/cart";
import { useTranslation } from "@/hooks";
import { Container } from "@/ui";

import {
  Additionals,
  Cutlery,
  Delivery,
  Note,
  Placeholder,
  ProductsList,
  Queue,
  SectionLayout,
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
        delivery,
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
              gridArea="cutlery"
              title={t<string>("cutleryQuantity")}
            >
              <Cutlery
                cutleryCount={cart.cutleryCount}
                cutleryPrice={cart.cutleryPrice}
              />
            </SectionLayout>

            <SectionLayout
              gridArea="delivery"
              title={t<string>("delivery")}
            >
              <Delivery
                {...delivery}
                {...client}
                {...{ totalPrice }}
              />
            </SectionLayout>

            <SectionLayout
              gridArea="additionals"
              title={t<string>("addMore")}
            >
              <Additionals
                additionals={additionals}
                cartAdditionals={cartAdditionals}
              />
            </SectionLayout>

            <SectionLayout
              gridArea="note"
              title={t<string>("note")}
            >
              <Note />
            </SectionLayout>

            <p>
              Konečná cena: {totalPrice} {t<string>("currency")}
            </p>
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
