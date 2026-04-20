import { usersStore } from "@/store";

const getUsers = (): Promise<TUser[]> => usersStore.getAll();

export { getUsers };
