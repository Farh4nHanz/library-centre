/**
 * Given a string, capitalize the first letter of each word and lowercase the rest
 * @example "hello world" -> "Hello World"
 * @param words the string to capitalize
 * @returns the capitalized string
 */
export const capitalizeLetter = (words: string) => {
  return words.replace(
    /\b\w/g,
    (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
  );
};
