import { useAuthContext } from "./contexts/auth";
import { Container } from "@mui/material";
import Header from "./components/header";
import Loader from "./components/loader";
import { AuthDialog, ShareDialog } from "./components/dialogs";
import React from "react";
import { useListenMovies, useShareMovie } from "./hooks/movies";
import { MovieList } from "./components/movies";

const App = () => {
  const { isLoading: isAuthLoading, register, logIn } = useAuthContext();
  const [isOpenedShareDialog, setIsOpenedShareDialog] = React.useState(false);
  const [isOpenedAuthDialog, setIsOpenedAuthDialog] = React.useState(false);
  const shareFunc = useShareMovie();
  const { movies, isLoading: isMoviesLoading } = useListenMovies();


  const doAuth = async (action, formValues) => {
    const allowedActions = ['register', 'login'];

    if (allowedActions.indexOf(action) === -1) {
      return;
    }

    const { username, password } = formValues;

    if (action === allowedActions[0]) {
      console.log("register");
      await register({
        username,
        password
      });
    } else {
      console.log("login");
      await logIn({
        username,
        password
      });
    }
  }

  console.log("App rendered", isMoviesLoading);

  const openShareDialog = () => {
    setIsOpenedShareDialog(true);
  }
  const closeShareDialog = () => {
    setIsOpenedShareDialog(false);
  }
  const openAuthDialog = () => {
    setIsOpenedAuthDialog(true);
  }
  const closeAuthDialog = () => {
    setIsOpenedAuthDialog(false);
  }

  if (isAuthLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Header openShareDialog={openShareDialog} openAuthDialog={openAuthDialog} />
      <MovieList list={movies} isLoading={isMoviesLoading} />
      <ShareDialog open={isOpenedShareDialog} handleClose={closeShareDialog} onSubmit={shareFunc} />
      <AuthDialog open={isOpenedAuthDialog} handleClose={closeAuthDialog} onSubmit={doAuth} />
    </Container>
  );
}

export default App;
