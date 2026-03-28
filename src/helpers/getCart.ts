// import { getSessionId } from "~/helpers";
// import { getClient } from "@/lib";

// const now = (): number => Date.now();

// const getCart = async (): Promise<TCart> => {
//   const client = await getClient();
//   const sid = await getSessionId();

//   if (sid) {
//     const cart = (await client.hGetAll(sid)) as unknown as TCart;

//     if (cart && !!Object.keys(cart).length) {
//       return {
//         ...cart,
//         products: JSON.parse(cart.products as unknown as string),
//       };
//     }
//   }

//   return {
//     createdAt: now(),
//     products: [],
//     totalPrice: 0,
//     updatedAt: now(),
//   };
// };

// export { getCart };
