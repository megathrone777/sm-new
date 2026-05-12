import React from "react";

import { Products } from "@/app/(web)/_components";
import { useTranslation } from "@/hooks";
import { store } from "@/store";
import { Container } from "@/ui";

import {
  Additionals,
  Client,
  Cutlery,
  Delivery,
  DeliveryType,
  FormLayout,
  Note,
  Placeholder,
  ProductsList,
  Queue,
  SectionLayout,
  Submit,
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
        products,
        totalPrice,
      } = cart;

      console.log(errors);

      return (
        <>
          <SectionLayout
            heroChildren={<Queue />}
            title={t<string>("order")}
          >
            <ProductsList {...{ categoryDiscount, products }} />
          </SectionLayout>

          <FormLayout {...{ errors }}>
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
              <Note defaultValue={note} />
            </SectionLayout>

            <Submit {...{ totalPrice }} />
          </FormLayout>
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
