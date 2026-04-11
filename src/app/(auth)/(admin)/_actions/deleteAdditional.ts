"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

const deleteAdditional = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id");
  const title = formData.get("title");

  await redis.hdel("additionals", `${id}`);

  revalidatePath("/admin/additionals");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteAdditional };
