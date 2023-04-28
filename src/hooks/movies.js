import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const refPath = "movies";
const moviesRef = ref(getDatabase(), refPath);

// https://stackoverflow.com/a/21607897/8270395
const getYoutubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const useShareMovie = () => {
  const newMovieRef = push(moviesRef);

  return async (url) => {
    const embedURL = `https://www.youtube.com/embed/${getYoutubeVideoId(url)}`;
    await set(newMovieRef, {
      url: embedURL,
    });
  };
};

const useListenMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const q = onValue(moviesRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((movieSnapshot) => {
        const id = movieSnapshot.key;
        const data = movieSnapshot.val();

        if (data) {
          const { url } = data;
          arr.push({
            id,
            url,
          });
        }
      });

      console.log("onValue called");
      setMovies(arr);
    });

    return () => q;
  }, []);

  return {
    movies,
    isLoading: typeof movies === "undefined",
  };
};

export { useShareMovie, useListenMovies };
