import React from "react";
import Form from "next/form";

import { login } from "@/app/(auth)/_actions";

const Page: React.FC<PageProps<"/login">> = () => (
  <>
    <h1>Login</h1>

    <Form action={login}>
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

      <button type="submit">Sign in</button>
    </Form>
  </>
);

export default Page;
