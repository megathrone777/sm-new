"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { searchProducts } from "@/app/(auth)/(admin)/_actions";
import { Search } from "@/app/(auth)/_components";

import { imageClass, imageHolderClass, listClass, linkClass } from "./ProductsSearch.css";

const ProductsSearch: React.FC = () => (
  <Search searchAction={searchProducts}>
    {(results): React.ReactElement => (
      <ul className={listClass}>
        {results.map(
          ({ id, imageUrl, slug, title }): React.ReactElement => (
            <li key={`search-product-${id}-${slug}`}>
              <Link
                className={linkClass}
                href={`/admin/product/${slug}` as __next_route_internal_types__.RouteImpl<string>}
              >
                <span className={imageHolderClass}>
                  <Image
                    alt={title}
                    className={imageClass}
                    fill
                    loading="eager"
                    src={`https://sushiman-office.cz${imageUrl}`}
                  />
                </span>

                <span>{title}</span>
              </Link>
            </li>
          ),
        )}
      </ul>
    )}
  </Search>
);

export { ProductsSearch };
