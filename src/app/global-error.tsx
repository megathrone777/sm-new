"use client";
import React from "react";

import { Button } from "@/ui";

const GlobalError: React.FC = () => (
  <html lang="cs">
    <body>
      <div className="error">
        <h1 className="error__title">Stránka nenalezena</h1>

        <img
          alt="Failed."
          className="error__image"
          src="/images/failed_img.png"
        />

        <Button href="/">Hlavní stránka</Button>
      </div>
    </body>
  </html>
);

export default GlobalError;
