// "use server";
// import { cookies } from "next/headers";
// import crypto from "node:crypto";

// const COOKIE_NAME: string = "sid";
// const COOKIE_MAX_AGE: number = 60 * 60 * 24 * 7;

// const createSessionId = async (): Promise<string> => {
//   const cookieStore = await cookies();
//   const sid = crypto.randomUUID();

//   cookieStore.set({
//     httpOnly: true,
//     maxAge: COOKIE_MAX_AGE,
//     name: COOKIE_NAME,
//     path: "/",
//     sameSite: "lax",
//     secure: true,
//     value: sid,
//   });

//   return `cart:${sid}`;
// };

// export { createSessionId };
