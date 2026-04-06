import React from "react";

import { Spinner } from "@/ui";

import { wrapperClass } from "./Loading.css";

const Loading: React.FC = () => (
  <div className={wrapperClass}>
    <Spinner />
  </div>
);

export { Loading };
