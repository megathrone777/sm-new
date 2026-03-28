// "use server";
// import { revalidatePath } from "next/cache";

// import { getSessionId } from "~/helpers";
// import { getClient } from "~/lib";
// import { createSessionId } from "./_createSessionId";

// const ttlSeconds: number = 60 * 60 * 24 * 7;
// const now = (): number => Date.now();

// const save = async ({ createdAt, products }: TCart): Promise<void> => {
//   const client = await getClient();
//   const sid = (await getSessionId()) ?? (await createSessionId());

//   await client.hSet(sid, {
//     createdAt,
//     products: JSON.stringify(products),
//     totalPrice: products.reduce(
//       (accumulator: number, product: TProduct): number =>
//         accumulator + product.priceCZK * product.quantity,
//       0,
//     ),
//     updatedAt: now(),
//   });
//   await client.expire(sid, ttlSeconds);

//   revalidatePath("/", "layout");
// };

// export { save };
