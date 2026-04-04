import React from "react";

const Sidebar: React.FC = () => (
  <div>
    <ul>
      <li>
        <a href="/products"></a>
      </li>
      <li>
        <a href="/orders">Orders</a>
      </li>
      <li>
        <a href="/clients">Clients</a>
      </li>
      <li>
        <a href="/settings"></a>
      </li>
    </ul>
  </div>
);

export { Sidebar };
