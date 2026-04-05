"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/ui";

import { wrapperClass } from "./ImageUploader.css";

import type { TProps } from "./ImageUploader.types";

const ImageUploader: React.FC<TProps> = ({ initialUrl }) => {
  const [previewUrl, setPreviewUrl] = useState<null | string>(initialUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const file = currentTarget.files?.[0];

    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className={wrapperClass}>
      <input
        name="imageUrl"
        type="hidden"
        value={initialUrl ?? ""}
      />

      {previewUrl && (
        <Image
          alt="Product preview."
          height={160}
          loading="eager"
          src={previewUrl}
          style={{ background: "#f5f5f5", borderRadius: 8, objectFit: "contain" }}
          width={160}
        />
      )}

      <Button
        onClick={() => inputRef.current?.click()}
        template="small"
        type="button"
      >
        {previewUrl ? "Select image" : "Upload image"}
      </Button>

      <input
        accept="image/*"
        hidden
        name="image"
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
      />
    </div>
  );
};

export { ImageUploader };
