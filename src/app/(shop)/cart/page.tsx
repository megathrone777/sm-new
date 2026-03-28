import React from "react";

import { createOrder } from "@/app/actions";

const Page: React.FC = async () => (
  <div>
    <h1>Cart page</h1>

    <form
      action={createOrder}
      style={{ marginBottom: 40 }}
    >
      <legend>New order</legend>

      <div>
        <input
          name="email"
          placeholder="E-mail"
          type="email"
        />
      </div>

      <div>
        <input
          name="price"
          placeholder="Price (CZK)"
          type="number"
        />
      </div>

      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
);

export default Page;
