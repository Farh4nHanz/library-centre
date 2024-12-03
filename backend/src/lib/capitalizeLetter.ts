export const capitalizeLetter = (words: string) => {
  return words.replace(
    /\b\w/g,
    (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
  );
};
