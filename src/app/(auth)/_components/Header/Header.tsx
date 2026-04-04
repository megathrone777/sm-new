import React from "react";

const Header: React.FC = () => (
  <div
    style={{
      alignItems: "center",
      display: "grid",
      gridAutoFlow: "column",
      justifyContent: "space-between",
    }}
  >
    <img
      alt="Logo."
      src="/uploads/logo_img.svg"
      style={{
        height: 70,
      }}
    />

    <button type="button">Logout</button>
  </div>
);

export { Header };
