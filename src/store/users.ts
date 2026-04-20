import { redis } from "./redis";

const HASH = "users";

const usersStore = {
  delete: async (login: string): Promise<void> => {
    await redis.hdel(HASH, login);
  },

  get: async (login: string): Promise<null | TUser> => {
    const data = await redis.hget(HASH, login);

    if (!data) return null;

    return (typeof data === "string" ? JSON.parse(data) : data) as TUser;
  },

  getAll: async (): Promise<TUser[]> => {
    const users = await redis.hgetall<Record<string, TUser>>(HASH);

    if (!users) return [];

    return Object.values(users).sort((a: TUser, b: TUser): number =>
      a.role.localeCompare(b.role),
    );
  },

  rename: async (previousLogin: string, user: TUser): Promise<void> => {
    await redis
      .pipeline()
      .hdel(HASH, previousLogin)
      .hset(HASH, { [user.login]: JSON.stringify(user) })
      .exec();
  },

  set: async (user: TUser): Promise<void> => {
    await redis.hset(HASH, { [user.login]: JSON.stringify(user) });
  },
};

export { usersStore };
