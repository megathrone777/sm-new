import { describe, expect, it } from "@jest/globals";

import { slugify } from "../slugify";

describe("slugify", () => {
  it("converts text to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("foo bar baz")).toBe("foo-bar-baz");
  });

  it("removes punctuation and special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("strips diacritics (accented letters)", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("Šťáva")).toBe("stava");
  });

  it("collapses multiple consecutive hyphens into one", () => {
    expect(slugify("foo--bar")).toBe("foo-bar");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  it("handles a product name with numbers", () => {
    expect(slugify("Pizza Margherita 30cm")).toBe("pizza-margherita-30cm");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});
