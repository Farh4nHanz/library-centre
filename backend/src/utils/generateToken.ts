import jwt from "jsonwebtoken";

/**
 * Generates an access token for a user.
 * @param userId The id of the user for which the token is being generated.
 * @returns {string} The generated access token.
 * 
 * @example
 * const accessToken = generateAccessToken(user.id);
 */
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
  });
};

/**
 * Generates a refresh token for a user.
 * @param userId The id of the user for which the token is being generated.
 * @returns {string} The generated refresh token.
 * 
 * @example
 * const refreshToken = generateRefreshToken(user.id);
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
  });
};
