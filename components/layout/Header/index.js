import React, { useContext } from "react";
import { css } from "@emotion/react";
import Link from "next/link";

import Button from "../../ui/Button";
import Search from "../../ui/Search";
import Navigation from "../Navigation";

import { FirebaseContext } from "../../../firebase";

import { Logo, Wrapper } from "./partials";

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey2);
        padding: 1rem 0;
      `}
    >
      <Wrapper>
        {/* Left */}
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/" passHref>
            <Logo>P</Logo>
          </Link>

          <Search />

          <Navigation />
        </div>

        {/* Right */}
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hi {user.displayName}
              </p>

              <Button
                bgColor="true"
                onClick={() => firebase.closeUserSession()}
              >
                Close Session
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button bgColor="true">Login</Button>
              </Link>

              <Link href="/register" passHref>
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
