import { apiCall } from "@/lib/api-call";

export const addBook = async (bookData) => {
  try {
    return await apiCall("post", "", bookData);
  } catch (err) {
    return err;
  }
};
