import React, { useContext, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "../firebase";
import pw from "a-promise-wrapper";

const auth = getAuth(firebaseApp);
const sanitizeUsername = str => {
  if (!str) {
    return '';
  }

  const s = str.toLowerCase().replace(/[^a-z0-9áéíóúñü \\.,_-]/gim, "");
  return s.trim();
}
const genEmail = username => `${sanitizeUsername(username)}@gmail.com`;


const AuthContext = React.createContext({
  user: undefined,
  isLoading: true,
  isSignedIn: false,
  logIn: async () => { },
  logOut: async () => { },
  register: async () => { },
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const isLoading = user === undefined;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(`signed in`);
      setUser(user);
    } else {
      console.log(`signed out`);
      setUser(null);
    }
  });

  const logIn = async (credentials) => {
    const { username, password } = credentials;
    const email = genEmail(username);

    return await pw(signInWithEmailAndPassword(auth, email, password));
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  const register = async (credentials) => {
    const { username, password } = credentials;
    const email = genEmail(username);

    return await pw(createUserWithEmailAndPassword(auth, email, password));
  }

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isSignedIn: !isLoading && !!user,
      logIn,
      logOut,
      register
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };