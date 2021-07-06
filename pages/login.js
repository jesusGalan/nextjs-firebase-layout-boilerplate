import React, { useState } from "react";
import Router from "next/router";

import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit } from "../components/ui/Form";
import useValidation from "../hooks/useValidation";
import ValidationLogin from "../validation/ValidationLogin";
import { Error } from "../components/ui/Form";

import firebase from "../firebase";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { values, errors, submitForm, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, ValidationLogin, loginUser);

  const { email, password } = values;

  const [error, saveError] = useState(false);

  async function loginUser() {
    try {
      await firebase.loginUser(email, password);
      await Router.push("/");
    } catch (error) {
      saveError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <h1>Login</h1>
        <Form noValidate onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.email && <Error>{errors.email}</Error>}

          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="Type your password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.password && <Error>{errors.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Login" />
        </Form>
      </Layout>
    </div>
  );
};

export default Login;
