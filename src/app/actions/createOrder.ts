"use server";
import { randomUUID } from "crypto";

import { realtime, redis } from "@/lib";

const createOrder = async (formData: FormData): Promise<void> => {
  const email = formData.get("email");
  const price = formData.get("price");

  if (email && price) {
    const emailExists = await redis.sismember("emails", email);

    if (emailExists) {
      throw new Error("Email already exists.");
    }

    const pipeline = redis.pipeline();
    const newId = randomUUID();

    pipeline.sadd("emails", email);
    pipeline.hset(`order:${newId}`, {
      created_at: Date.now(),
      email,
      price,
    });

    pipeline.zadd("orders", {
      member: newId,
      score: Date.now(),
    });

    pipeline.zadd("orders_by_email", {
      member: newId,
      score: Date.now(),
    });

    await pipeline.exec();
    await realtime.emit("notification.newOrder", {
      created_at: Date.now(),
      email: `${email}`,
      price: +price,
    });
  }
};

export { createOrder };
