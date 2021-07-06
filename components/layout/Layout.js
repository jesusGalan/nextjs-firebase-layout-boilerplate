import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/react";

const Layout = ({ children }) => {
  // Todo lo que esté fuera de la etiqueta <main> pero dentro del componente se reutilizará en toda la web.
  return (
    <>
      <Global
        styles={css`
          :root {
            --grey: #3d3d3d;
            --grey2: #6f6f6f;
            --orange: #d5552f;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            line-height: 1.5;
          }

          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          h1,
          h2 {
            font-family: "Roboto Slab 700", serif;
            font-weight: 700;
          }

          h3 {
            font-family: "PT Sans 700", serif;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          h1 {
            text-align: center;
            margin-top: 5rem;
          }
        `}
      />

      <Header />

      <main>{children}</main>
    </>
  );
};

export default Layout;
