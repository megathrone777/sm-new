"use client";
import dynamic from "next/dynamic";

const ToastsLoader = dynamic(() => import("./Toasts").then(({ Toasts }) => Toasts), { ssr: false });

export { ToastsLoader };
