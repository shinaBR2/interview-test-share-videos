import { getDatabase, ref, child, get } from "firebase/database";
import { useAuthContext } from "./contexts/auth";
import { Container } from "@mui/material";
import Header from "./components/header";
import Loader from "./components/loader";
import { AuthDialog, ShareDialog } from "./components/dialogs";

const App = () => {
  const { isLoading, register } = useAuthContext();
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

  const doSignUp = async () => {
    const username = 'test';
    const password = 'dddadad';

    await register({
      username,
      password
    });
  }

  const openShareDialog = () => {
    setIsOpenedShareDialog(true);
  }
  const openAuthDialog = () => {
    setIsOpenedAuthDialog(true);
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Header openShareDialog={openShareDialog} openAuthDialog={openAuthDialog} />
      <ShareDialog open={isOpenedShareDialog} />
      <AuthDialog open={isOpenedAuthDialog} />
    </Container>
  );
}

export default App;
