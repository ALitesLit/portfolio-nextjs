"use client";
import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [ matches, setMatches ]: [ matches: boolean, setMatches: Function ] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default useMediaQuery;