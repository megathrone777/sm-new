import { redis } from "@/lib";

const getUsers = async (): Promise<TUser[]> => {
  const users = await redis.hgetall<Record<string, TUser>>("users");

  if (!users) return [];

  return Object.values(users).sort((userA: TUser, userB: TUser): number =>
    userA.role.localeCompare(userB.role),
  );
};

export { getUsers };
