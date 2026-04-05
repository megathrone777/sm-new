import { redis } from "@/lib";

const getUsers = async (): Promise<TUser[]> => {
  const users = await redis.hgetall<Record<string, TUser>>("users");

  if (!users) return [];

  return Object.values(users).map((u) => (typeof u === "string" ? JSON.parse(u) : u));
};

export { getUsers };
