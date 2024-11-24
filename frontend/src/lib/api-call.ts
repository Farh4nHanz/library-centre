import api from "@/api";
import { AxiosError } from "axios";
import { type ApiMethod, type URL } from "@/types";

/**
 * Makes an API call to the specified URL using the specified HTTP method.
 *
 * @param {ApiMethod} method - The HTTP method to use for the API call.
 * @param {URL} url - The URL of the API endpoint to call.
 * @param {object} [data] - The data to send with the request, if applicable.
 * @returns {Promise<T>} A promise that resolves with the response data from the API call.
 * @throws {Error} If there is an error with the API call, this function will throw an error
 *   with a message describing the error.
 */
export async function apiCall<T>(
  method: ApiMethod,
  url: URL,
  data?: any
): Promise<T> {
  try {
    const res = await api[method](url, data);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(`API Error (${url}):`, err.message);
      throw new Error(err.response.data.message);
    }

    console.error("Unexpected error:", err);
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}
