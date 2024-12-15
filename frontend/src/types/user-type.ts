export type User = {
  id: string;
  username: string;
  role: "user" | "admin";
  photoURL: string | null;
};

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  photoURL?: string;
};
