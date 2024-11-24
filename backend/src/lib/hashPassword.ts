import bcrypt from "bcryptjs";

/**
 * Generates a hashed version of a given password.
 * Uses a randomly generated salt of factor 10.
 *
 * @param password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 * 
 * @example
 * const hashedPassword = await hashPassword(password);
 */
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default hashPassword;
