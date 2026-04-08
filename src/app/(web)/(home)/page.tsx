import React from "react";

import { Products } from "@/app/(web)/_components";

const Page: React.FC<PageProps<"/">> = () => (
  <>
    <Products title="Menu" />
    <div id="reviews-section">Reviews</div>
  </>
);

export default Page;
