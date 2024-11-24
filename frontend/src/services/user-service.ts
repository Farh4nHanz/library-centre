import api from "@/api";

export const getUserProfile = async () => {
  try {
    const {
      status,
      data: { user },
    } = await api.post("/profile");

    if (status === 200) return user;
  } catch (err) {
    console.error((err as Error).message);
  }
};
