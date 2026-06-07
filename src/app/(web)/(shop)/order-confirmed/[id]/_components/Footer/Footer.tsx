"use client";
import React from "react";

import { Button } from "@/ui";

import { wrapperClass } from "./Footer.css";

const Footer: React.FC = () => (
  <div className={wrapperClass}>
    <Button href="/">Hlavní stránka</Button>
  </div>
);

export { Footer };
