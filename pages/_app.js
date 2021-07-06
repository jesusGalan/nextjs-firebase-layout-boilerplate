import React from "react";
import Head from "next/head";

import "../styles/globals.css";
import "../public/static/css/app.css";

import useAuthentication from "../hooks/useAuthentication";

import firebase, { FirebaseContext } from "../firebase";

function MyApp({ Component, pageProps }) {
  const user = useAuthentication();
  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <Head>
        <title>Product hunt con next y firebase</title>
      </Head>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
