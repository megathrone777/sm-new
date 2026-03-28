import React from "react";

import { createOrder } from "@/app/actions";
import { helpers } from "@/db";

const Page: React.FC = async () => {
  const orders = await helpers.getJSON<TOrder[]>("orders");

  console.log(orders);

  return (
    <div>
      <h1>Cart page</h1>

      <form
        action={createOrder}
        style={{ marginBottom: 40 }}
      >
        <legend>New product</legend>

        <div>
          <input
            name="name"
            placeholder="Name"
            type="text"
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

      {orders && !!orders.length && (
        <div>
          {orders.map(
            ({ id, name, price }: TOrder): React.ReactElement => (
              <div
                key={`${id}-order`}
                style={{ display: "flex", flexDirection: "column", rowGap: 15 }}
              >
                <span>Order #{id}</span>
                <span>{name}</span>
                <span>{price}CZK</span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
