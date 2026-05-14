import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/app/(web)/_actions", () => ({
  addToCart: jest.fn(),
  validateNewProduct: jest.fn().mockResolvedValue({ message: "Přidáno", type: "success" }),
}));

jest.mock("@/app/(web)/_components/Controls/shopClosed", () => ({
  dispatchShopClosed: jest.fn(),
  SHOP_CLOSED_MESSAGE: "Teď máme zavřeno",
}));

jest.mock("@/ui", () => ({
  Icon: ({ id }: { id: string }): React.ReactElement => <span data-testid={`icon-${id}`} />,
}));

jest.mock("next/form", () => ({
  __esModule: true,
  default: ({
    action,
    children,
  }: {
    action: () => void;
    children: React.ReactNode;
  }): React.ReactElement => (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        action();
      }}
    >
      {children}
    </form>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("../Submit.css", () => ({
  buttonClass: "",
  iconClass: "",
}));

import { toast } from "react-toastify";

import { addToCart, validateNewProduct } from "@/app/(web)/_actions";
import {
  SHOP_CLOSED_MESSAGE,
  dispatchShopClosed,
} from "@/app/(web)/_components/Controls/shopClosed";

import { Submit } from "../Submit";

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
  price: 200,
  promotionDiscountAmount: 0,
  promotionForEveryXProducts: 0,
  requiredCutlery: false,
  requiredModifier: false,
  slug: "test-product",
  sortOrder: 1,
  title: "Test Product",
  weight: "200g",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Submit (products list add-to-cart)", () => {
  describe("display", () => {
    it("renders a submit button", () => {
      render(<Submit {...baseProduct} />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("shows the buy icon inside the button", () => {
      render(<Submit {...baseProduct} />);
      expect(screen.getByTestId("icon-buy")).toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    const submitForm = (): void => {
      fireEvent.submit(screen.getByRole("button").closest("form")!);
    };

    it("calls validateNewProduct with the product when submitted", async () => {
      render(<Submit {...baseProduct} />);

      await act(async () => {
        submitForm();
      });

      expect(validateNewProduct).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, price: 200, quantity: 1, totalPrice: 200 }),
      );
    });

    it("shows a success toast and calls addToCart when validation succeeds", async () => {
      render(<Submit {...baseProduct} />);

      await act(async () => {
        submitForm();
      });

      expect(toast).toHaveBeenCalledWith("Přidáno", { type: "success" });
      expect(addToCart).toHaveBeenCalled();
    });

    it("shows an error toast but does NOT call addToCart when validation fails", async () => {
      jest.mocked(validateNewProduct).mockResolvedValue({ message: "Chyba", type: "error" });

      render(<Submit {...baseProduct} />);

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

      render(<Submit {...baseProduct} />);

      await act(async () => {
        submitForm();
      });

      expect(dispatchShopClosed).toHaveBeenCalled();
      expect(toast).not.toHaveBeenCalled();
    });
  });
});
