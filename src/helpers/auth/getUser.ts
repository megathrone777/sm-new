import { redis } from "@/lib";

const getUser = async (login: string): Promise<null | TUser> => {
  const data = await redis.hget("users", login);

  if (!data) return null;

  return (typeof data === "string" ? JSON.parse(data) : data) as TUser;
};

export { getUser };
