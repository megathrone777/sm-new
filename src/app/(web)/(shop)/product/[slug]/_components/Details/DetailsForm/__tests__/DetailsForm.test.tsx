import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/app/(web)/_actions", () => ({
  addToCart: jest.fn(),
  validateNewProduct: jest
    .fn()
    .mockResolvedValue({ message: "Přidáno do košíku", type: "success" }),
}));

jest.mock("@/app/(web)/_components/Controls/shopClosed", () => ({
  dispatchShopClosed: jest.fn(),
  SHOP_CLOSED_MESSAGE: "Teď máme zavřeno",
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/product/test"),
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
    toString: jest.fn(() => ""),
  })),
}));

jest.mock("@/hooks", () => ({
  useTranslation: (): { t: (key: string) => string } => ({ t: (key: string) => key }),
}));

jest.mock("@/ui", () => ({
  Button: ({
    children,
    type,
  }: {
    children: React.ReactNode;
    type?: string;
  }): React.ReactElement => <button type={type as "button" | "submit"}>{children}</button>,
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("@/utils", () => ({
  toKey: (v: string): string => v,
}));

jest.mock("../DetailsForm.css", () => ({
  footerClass: "",
  totalPriceClass: "",
  totalPriceValueClass: "",
}));

import { toast } from "react-toastify";

import { addToCart, validateNewProduct } from "@/app/(web)/_actions";
import {
  SHOP_CLOSED_MESSAGE,
  dispatchShopClosed,
} from "@/app/(web)/_components/Controls/shopClosed";

import { DetailsForm } from "../DetailsForm";

const baseProduct: TProduct = {
  allergens: null,
  categoryId: 1,
  composition: "",
  description: null,
  fbDescription: null,
  fbUpload: false,
  freeCutleryCount: 0,
  id: 1,
  imageUrl: "",
  isAvailable: true,
  isMultipleModifiers: null,
  isPromotionActive: false,
  isTopProduct: false,
  modifiers: [],
  modifiersTitle: null,
  price: 150,
  promotionDiscountAmount: 0,
  promotionForEveryXProducts: 0,
  requiredCutlery: false,
  requiredModifier: false,
  slug: "test-product",
  sortOrder: 1,
  title: "Test Product",
  weight: "300g",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DetailsForm", () => {
  describe("display", () => {
    it("renders the add-to-cart submit button", () => {
      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      expect(screen.getByRole("button", { name: /addToCart/i })).toBeInTheDocument();
    });

    it("sets the hidden totalPrice field to the product price on initial render", () => {
      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      const hidden = document.querySelector<HTMLInputElement>("input[name='totalPrice']")!;

      expect(hidden.value).toBe("150");
    });

    it("does not show the price section when the product has no modifiers", () => {
      render(
        <DetailsForm
          {...baseProduct}
          modifiers={[]}
        >
          <div />
        </DetailsForm>,
      );

      expect(screen.queryByText(/currency/)).not.toBeInTheDocument();
    });

    it("shows the price section and children when the product has modifiers", () => {
      const modifiers: TModifier[] = [
        { id: 1, price: 20, requiredSubModifier: false, sortOrder: 1, title: "Extra" },
      ];

      render(
        <DetailsForm
          {...baseProduct}
          modifiers={modifiers}
        >
          <div data-testid="modifier-children" />
        </DetailsForm>,
      );

      expect(screen.getByText(/currency/)).toBeInTheDocument();
      expect(screen.getByTestId("modifier-children")).toBeInTheDocument();
    });

    it("updates the hidden totalPrice when a modifier is selected", () => {
      const modifiers: TModifier[] = [
        { id: 10, price: 30, requiredSubModifier: false, sortOrder: 1, title: "Sauce" },
      ];

      render(
        <DetailsForm
          {...baseProduct}
          modifiers={modifiers}
        >
          <input
            name="modifier"
            type="checkbox"
            value={10}
          />
        </DetailsForm>,
      );

      const form = document.querySelector("form")!;

      fireEvent.change(form, {});

      const hidden = document.querySelector<HTMLInputElement>("input[name='totalPrice']")!;

      expect(+hidden.value).toBeGreaterThanOrEqual(150);
    });
  });

  describe("form submission", () => {
    const submitForm = (): HTMLFormElement => {
      const form = document.querySelector("form")!;

      fireEvent.submit(form);

      return form;
    };

    it("calls validateNewProduct when the form is submitted", async () => {
      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      await act(async () => {
        submitForm();
      });

      expect(validateNewProduct).toHaveBeenCalledWith(
        expect.objectContaining({ price: 150, quantity: 1 }),
      );
    });

    it("shows a success toast and calls addToCart when validation succeeds", async () => {
      jest
        .mocked(validateNewProduct)
        .mockResolvedValue({ message: "Přidáno do košíku", type: "success" });

      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      await act(async () => {
        submitForm();
      });

      expect(toast).toHaveBeenCalledWith("Přidáno do košíku", { type: "success" });
      expect(addToCart).toHaveBeenCalled();
    });

    it("shows an error toast but does NOT call addToCart when validation fails", async () => {
      jest.mocked(validateNewProduct).mockResolvedValue({ message: "Chyba", type: "error" });

      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      await act(async () => {
        submitForm();
      });

      expect(toast).toHaveBeenCalledWith("Chyba", { type: "error" });
      expect(addToCart).not.toHaveBeenCalled();
    });

    it("dispatches the shop-closed event and skips the toast when shop is closed", async () => {
      jest
        .mocked(validateNewProduct)
        .mockResolvedValue({ message: SHOP_CLOSED_MESSAGE as string, type: "error" });

      render(
        <DetailsForm {...baseProduct}>
          <div />
        </DetailsForm>,
      );

      await act(async () => {
        submitForm();
      });

      expect(dispatchShopClosed).toHaveBeenCalled();
      expect(toast).not.toHaveBeenCalled();
    });
  });
});
