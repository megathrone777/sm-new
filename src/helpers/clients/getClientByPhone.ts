import { clientsStore } from "@/store";

const getClientByPhone = (phoneNumber: string): Promise<null | TClient> =>
  clientsStore.getByPhone(phoneNumber);

export { getClientByPhone };
