"use client";
import React from "react";

import { Error } from "@/components";

const GlobalError: React.FC = () => (
  <html>
    <body>
      <Error title="Something went wrong" />
    </body>
  </html>
);

export default GlobalError;
