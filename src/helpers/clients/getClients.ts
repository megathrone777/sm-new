import { clientsStore } from "@/store";

const getClients = (offset = 0, limit = 50): Promise<TClient[]> =>
  clientsStore.getAll(offset, limit);

export { getClients };
