import { getDatabase, ref, child, get } from "firebase/database";
import { useAuthContext } from "./contexts/auth";
import { Container } from "@mui/material";
import Header from "./components/header";
import Loader from "./components/loader";
import { AuthDialog, ShareDialog } from "./components/dialogs";
import React from "react";

const App = () => {
  const { isLoading, register, logIn } = useAuthContext();
  const [isOpenedShareDialog, setIsOpenedShareDialog] = React.useState(false);
  const [isOpenedAuthDialog, setIsOpenedAuthDialog] = React.useState(false);

  const dbRef = ref(getDatabase());
  const refPath = "test";
  get(child(dbRef, refPath)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

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

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Header openShareDialog={openShareDialog} openAuthDialog={openAuthDialog} />
      <ShareDialog open={isOpenedShareDialog} handleClose={closeShareDialog} />
      <AuthDialog open={isOpenedAuthDialog} handleClose={closeAuthDialog} onSubmit={doAuth} />
    </Container>
  );
}

export default App;
