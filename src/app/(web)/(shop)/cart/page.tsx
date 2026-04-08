import React from "react";

// import { seedCatalog } from "@/app/actions/seedCatalog";
// import { getProductBySlug } from "@/helpers";

const Page: React.FC<PageProps<"/cart">> = () => {
  // const product = await getProductBySlug("assorti-trend-3");

  // console.log(product);

  return (
    <div>
      <h1>Cart page</h1>

      <form
        // action={seedCatalog}
        style={{ marginBottom: 40 }}
      >
        <input type="hidden" />

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
