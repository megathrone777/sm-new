import { describe, expect, it } from "@jest/globals";

jest.mock("../redis", () => ({}));

import { about } from "../about";

describe("about", () => {
  describe("get", () => {
    it("is an object with get and set methods", () => {
      expect(about).toHaveProperty("get");
      expect(about).toHaveProperty("set");
      expect(typeof about.get).toBe("function");
      expect(typeof about.set).toBe("function");
    });
  });
});
