import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const hashPassword = (password: string, salt?: string): { hash: string; salt: string } => {
  const saltValue = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, saltValue, 64).toString("hex");

  return { hash, salt: saltValue };
};

const verifyPassword = (password: string, storedHash: string, salt: string): boolean => {
  const { hash } = hashPassword(password, salt);

  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
};

export { hashPassword, verifyPassword };
