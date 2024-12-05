import { Readable } from "stream";

/**
 * Converts a Readable stream to a Buffer.
 *
 * @param stream - The Readable stream to be converted.
 * @returns A Promise that resolves to a Buffer.
 */
export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};
