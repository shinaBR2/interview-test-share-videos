import { getDatabase, ref, child, get } from "firebase/database";
import logo from './logo.svg';
import './App.css';
import { useAuthContext } from "./contexts/auth";
import { Button, Container } from "@mui/material";
import Header from "./components/header";
import Loader from "./components/loader";

const App = () => {
  const { isLoading, register } = useAuthContext();

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

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="App">
      <Container>
        <Header />
        <Button onClick={doSignUp}>Sign up</Button>
      </Container>
    </div>
  );
}

export default App;
