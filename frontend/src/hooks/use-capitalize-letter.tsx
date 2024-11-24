import { capitalizeLetter } from "@/lib/utils";
import { useMemo } from "react";

export const useCapitalizeLetter = (words: string) => {
  return useMemo(() => {
    return capitalizeLetter(words);
  }, []);
};
