import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InputText = styled.input`
  border: 1px solid var(--grey2);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 2rem;
  width: 2rem;
  display: block;
  -webkit-background-size: cover;
  background-size: cover !important;
  background-image: url(/static/img/search.png);
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: white;
  border: none;
  height: 0;
  overflow: hidden;
  padding-top: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Search products" />

      <InputSubmit type="submit">Search</InputSubmit>
    </form>
  );
};

export default Search;
