declare global {
  interface TActionResult {
    message: string;
    type: "error" | "success";
  }

  type TUserRole = "admin" | "cook" | "waiter";

  interface TUser {
    id: string;
    login: string;
    passwordHash: string;
    role: TUserRole;
    salt: string;
  }

  interface TSessionData {
    role: TUserRole;
    userId: TUser["id"];
  }

  interface TSelectOption {
    label: string;
    value: null | string;
  }
}

export {};
