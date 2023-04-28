import { getDatabase, ref, push, set } from "firebase/database";

const useShareMovie = () => {
  const refPath = "movies";
  const moviesRef = ref(getDatabase(), refPath);
  const newMovieRef = push(moviesRef);

  return async (url) => {
    // TODO
    await set(newMovieRef, {
      url
    })
  }
};

export { useShareMovie }