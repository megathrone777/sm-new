import { useContext } from "react";

import { AppContext, type TContext } from "@/store";

const useStore = (): TContext => {
  const { dispatch, store } = useContext(AppContext);

  return {
    dispatch,
    store,
  };
};

export { useStore };
