import { usersStore } from "@/store";

const getUser = (login: string): Promise<null | TUser> => usersStore.get(login);

export { getUser };
