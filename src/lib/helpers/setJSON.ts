// import { redis } from "@/db";

// const setJSON = async <T>(key: string, value: T, ttl?: number): Promise<void> => {
//   const data = JSON.stringify(value);

//   if (ttl) {
//     await redis.set(key, data, { EX: ttl });
//   } else {
//     await redis.set(key, data);
//   }
// };

// export { setJSON };
