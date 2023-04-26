import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import logo from './logo.svg';
import './App.css';
import firebaseApp from "./firebase";

const App = () => {
  const database = getDatabase(firebaseApp);
  const auth = getAuth(firebaseApp);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
