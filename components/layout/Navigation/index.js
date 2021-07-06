import React, { useContext } from "react";
import Link from "next/link";

import { FirebaseContext } from "../../../firebase";

import { Nav } from "./partials";

const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/popular">Popular</Link>
      {user && <Link href="/create-product">Add product</Link>}
    </Nav>
  );
};

export default Navigation;
