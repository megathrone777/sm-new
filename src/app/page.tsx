import React from "react";

// import { Products } from "./Products";
// import { getProducts } from "./api";
import { getClient } from "~/redis";
import { getData } from "~/pg";

// const getData2 = async (): Promise<unknown> => {
//   const response = await fetch(
//     `https://sushiman-office.cz/api/submodifiers?`,
//     {
//       cache: "no-store",
//       headers: {
//         authorization:
//           "Bearer 8112224443e79a579cc759a320e9b78e0bd5ea3bddde018c8892a4a5aec656754d1af3871cdeac33924ad9b8f2bd5ecf392a95bd63f708c083997d2bf3992083a6d093cd03c81cd50cdc9d4c4b1901d5ef8c20ea8911f206180b2b313aa5f1959bf538e018353207822ea25071f55b9226d4a8969455c8d0b5ad2a39249ccd7b",
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//     }
//   );

//   if (!response.ok) {
//     console.error("Failed to fetch data");
//   }

//   return await response.json();
// };

// export { getData };


const HomePage: React.FC = async () => {
  const products = await getData("products");
  const client = await getClient();
  // const products = await getProducts();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // products.data.map(({ attributes }) => {
  //   console.log(attributes);
  // });
  const arr = products.data.map(
    ({
      id,
      attributes: {
        allergens,
        composition,
        fbCategoryId,
        fbDescription,
        fbUpload,
        freeCutleryCount,
        googleCategoryId,
        isAvailable,
        isMultipleModifiers,
        isTopProduct,
        lastPriceCZK,
        modifiers,
        modifiersTitle,
        orderIndex,
        picture,
        priceCZK,
        productCategory,
        requiredCutlery,
        requiredModifier,
        shortDescription,
        slug,
        title,
        weight,
      },
    }) => {
      // console.log(modifiers.data);
      // const category = {
      //   title: productCategory.title,
      //   isPromotionActive: productCategory.isPromotionActive,
      //   promotionDiscountAmount: productCategory.promotionDiscountAmount,
      //   promotionForEveryXProducts: productCategory.promotionForEveryXProducts,
      //   orderIndex: productCategory.orderIndex,
      //   titleModificators: productCategory.titleModificators,
      //   fbCategoryId: productCategory.fbCategoryId,
      //   googleCategoryId: productCategory.googleCategoryId,
      // };

      const category = productCategory.data.attributes;

      const newCategory = {
        id: productCategory.data.id,
        title: category.title,
        isPromotionActive: category.isPromotionActive,
        promotionDiscountAmount: category.promotionDiscountAmount,
        promotionForEveryXProducts: category.promotionForEveryXProducts,
        orderIndex: category.orderIndex,
        titleModificators: category.titleModificators,
        fbCategoryId: category.fbCategoryId,
        googleCategoryId: category.googleCategoryId,
      };

      // console.log(newCategory, "new");

      return {
        id,
        title,
        composition,
        allergens,
        weight,
        priceCZK,
        requiredModifier,
        requiredCutlery,
        freeCutleryCount,
        isAvailable,
        isTopProduct,
        lastPriceCZK,
        orderIndex,
        shortDescription,
        isMultipleModifiers,
        slug,
        fbCategoryId,
        googleCategoryId,
        fbDescription,
        fbUpload,
        modifiersTitle,
        image: picture.data.attributes.url,
        category: newCategory,
        modifiers:
          modifiers.data && modifiers.data.length > 0
            ? modifiers.data.map(async ({ attributes, id }) => {
                const submodifiers = await getData("submodifiers");
              console.log(id);
                const {
                  orderIndex,
                  requiredSubModifier,
                  priceMarkupCZK,
                  title,
                } = attributes;

                return {
                  id,
                  title,
                  priceMarkupCZK,
                  requiredSubModifier,
                  orderIndex,
                };
              })
            : [],
      };
    }
  );

  if (arr && !!arr.length) {
    // console.log(arr);
    // await client.json.set("products", "$", arr);
    // const newProducts = await client.json.get("products");
    // console.log(newProducts);
  }

  // return <Products {...{ products }} />;
  return <div></div>;
};

export default HomePage;
