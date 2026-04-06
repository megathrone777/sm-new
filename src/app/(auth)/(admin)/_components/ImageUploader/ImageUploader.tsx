"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/ui";

import { imageClass, wrapperClass } from "./ImageUploader.css";

import type { TProps } from "./ImageUploader.types";

const ImageUploader: React.FC<TProps> = ({ initialUrl }) => {
  const [previewUrl, setPreviewUrl] = useState<null | string>(initialUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const file = currentTarget.files?.[0];

    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSelectClick = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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
          alt="Image preview."
          className={imageClass}
          height={200}
          loading="eager"
          src={previewUrl}
          width={200}
        />
      )}

      <Button
        onClick={handleSelectClick}
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
