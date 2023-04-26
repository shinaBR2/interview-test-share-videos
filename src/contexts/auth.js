import React, { FC, useContext, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);
const genEmail = username => `${username}@gmail.com`;

const AuthContext = React.createContext({
  user: undefined,
  isLoading: true,
  isSignedIn: false,
  logIn: async () => {},
  logOut: async () => {},
  register: async () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
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

    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  const register = async (credentials) => {
    const { username, password } = credentials;
    const email = genEmail(username);

    await createUserWithEmailAndPassword(auth, email, password);
  }

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isSignedIn: !isLoading && !!user && isAdmin,
      logIn,
      logOut,
      register
    }),
    [user, isLoading, isAdmin]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };