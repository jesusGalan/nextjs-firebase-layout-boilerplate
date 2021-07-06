import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuthentication() {
  const [authUser, saveAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        saveAuthUser(user);
      } else {
        saveAuthUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  return authUser;
}

export default useAuthentication;
