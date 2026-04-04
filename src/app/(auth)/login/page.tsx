import React from "react";
import Form from "next/form";

const Page: React.FC = () => {
  return (
    <>
      <h1>Login page</h1>

      <Form action="#">
        <div>
          <input
            name="login"
            placeholder="Login"
            type="text"
          />
        </div>

        <div>
          <input
            name="password"
            placeholder="Password"
            type="password"
          />
        </div>
      </Form>
    </>
  );
};

export default Page;
