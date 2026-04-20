import { submodifiersStore } from "@/store";

const getSubmodifierById = (id: number): Promise<null | TSubmodifier> =>
  submodifiersStore.getById(id);

export { getSubmodifierById };
